import {
  AfterRenderPhase,
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  afterNextRender,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../models/table/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHttpService } from '../services/http/api-http.service';
import { ApiSocketService } from '../services/socket/api-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Logger } from '../utils/logger/logger';
import { SessionUser } from '../models/session-user/session-user';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent implements OnInit, OnDestroy {
  tableCode: string = '';
  currentSessionUserId: number = 0;

  currentSessionUser: SessionUser | null = null;
  table: Table | null = null;
  sessionUsers: WritableSignal<SessionUser[]> = signal([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private api: ApiHttpService,
    private socket: ApiSocketService,
    private cookieService: CookieService
  ) {
    afterNextRender(
      () => {
        Logger.d(['afterNextRender', this.tableCode]);

        if (this.tableCode == '' || this.currentSessionUserId == 0) {
          this.cookieService.deleteAll();
          router.navigate(['/']);
        } else {
          this.setupTableData();

          this.setupSocket();
        }
      },
      { phase: AfterRenderPhase.Write }
    );

    effect(() => {
      Logger.d(['sessionUsers siginal', this.sessionUsers()]);
    });
  }

  setupTableData() {
    this.api.getTableByCode(this.tableCode).subscribe((body) => {
      try {
        if (body.success == null) {
          throw new Error('unknow message from api');
        }

        if (body.success == false) {
          throw new Error(body.message);
        }

        this.table = Table.parse(JSON.stringify(body.data));

        Logger.d(this.table);
      } catch (e) {
        Logger.d((e as Error).message);
      }
    });
  }

  setupSocket() {
    this.socket.connect();

    this.socket.onConnect().subscribe((message) => {
      Logger.d(['socket onConnect', message]);

      this.socket.joinSession(this.currentSessionUserId);
    });

    this.socket.onError().subscribe((message) => {
      Logger.d(['socket onError', message]);

      this.toastr.error(message, 'Erro');
    });

    this.socket.onUsers().subscribe((data) => {
      Logger.d(['socket onUsers', data.sessionUsers]);

      this.sessionUsers.set([]);

      const newSessionUsers: SessionUser[] = [];

      data.sessionUsers.forEach((sessionUserObj) => {
        try {
          const sessionUser: SessionUser = SessionUser.parse(
            JSON.stringify(sessionUserObj)
          );

          if (sessionUser.id == this.currentSessionUserId) {
            this.currentSessionUser = sessionUser;
          }

          newSessionUsers.push(sessionUser);
        } catch (e) {
          Logger.d((e as Error).message);
        }
      });

      this.sessionUsers.set(newSessionUsers);
    });

    this.socket.onOrders().subscribe((data) => {
      Logger.d(['socket onOrders', data.sessionOrders]);
    });
  }

  ngOnInit(): void {
    this.tableCode = this.cookieService.get('currentTableCode');
    this.currentSessionUserId = Number(
      this.cookieService.get('currentSessionUserId')
    );
  }

  ngOnDestroy(): void {}
}

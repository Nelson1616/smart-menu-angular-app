import {
  AfterRenderPhase,
  Component,
  OnDestroy,
  OnInit,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiHttpService } from '../services/http/api-http.service';
import { ApiSocketService } from '../services/socket/api-socket.service';
import { SessionUser } from '../models/session-user/session-user';
import { Table } from '../models/table/table';
import { Logger } from '../utils/logger/logger';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private api: ApiHttpService,
    private socket: ApiSocketService
  ) {
    afterNextRender(
      () => {
        Logger.d(['afterNextRender', this.tableCode]);

        this.setupTableData();

        this.setupUsersSocket();
      },
      { phase: AfterRenderPhase.Write }
    );
  }

  tableCode: string = '';

  table: Table | null = null;

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

  setupUsersSocket() {
    this.socket.connect();

    this.socket.onConnect().subscribe((message) => {
      Logger.d(['socket onConnect', message]);

      this.socket.joinTable(this.tableCode);
    });

    this.socket.onUsers().subscribe((data) => {
      Logger.d(['socket onUsers', data.sessionUsers]);

      data.sessionUsers.forEach((sessionUserObj) => {
        try {
          const sessionUser: SessionUser = SessionUser.parse(
            JSON.stringify(sessionUserObj)
          );
          Logger.d(['SessionUser', sessionUser]);
          Logger.d(['SessionUser name', sessionUser.user?.getName()]);
        } catch (e) {
          Logger.d((e as Error).message);
        }
      });
    });
  }

  ngOnInit(): void {
    Logger.d('ngOnInit');

    this.route.paramMap.subscribe((paramMap) => {
      this.tableCode = paramMap.get('code')!;
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}

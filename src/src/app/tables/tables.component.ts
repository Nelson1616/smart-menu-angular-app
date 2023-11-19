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
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit, OnDestroy {
  tableCode: string = '';

  table: Table | null = null;

  avatars: Array<{ id: number; path: string }> = [];

  selectedAvatar: { id: number; path: string } = {
    id: 1,
    path: '/assets/images/avatar_1.png',
  };

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

  selectAvatar(avatarId: number) {
    this.selectedAvatar = {
      id: avatarId,
      path: `/assets/images/avatar_${avatarId}.png`,
    };
  }

  ngOnInit(): void {
    Logger.d('ngOnInit');

    this.route.paramMap.subscribe((paramMap) => {
      this.tableCode = paramMap.get('code')!;
    });

    for (let i = 1; i < 9; i++) {
      this.avatars.push({
        id: i,
        path: `/assets/images/avatar_${i}.png`,
      });
    }
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}

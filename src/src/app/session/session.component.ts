import {
  AfterRenderPhase,
  Component,
  OnDestroy,
  OnInit,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../models/table/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHttpService } from '../services/http/api-http.service';
import { ApiSocketService } from '../services/socket/api-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Logger } from '../utils/logger/logger';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent implements OnInit, OnDestroy {
  tableCode: string = '';
  table: Table | null = null;

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

        if (this.tableCode == '') {
          this.cookieService.deleteAll();
          router.navigate(['/']);
        }

        this.setupTableData();
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

  ngOnInit(): void {
    this.tableCode = this.cookieService.get('currentTableCode');
  }

  ngOnDestroy(): void {}
}

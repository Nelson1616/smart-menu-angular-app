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
    private socket: ApiSocketService,
  ) {
    afterNextRender(
      () => {
        console.log('afterNextRender', this.tableCode);

        this.api.getTableByCode(this.tableCode).subscribe((data) => {
          console.log(data);
        });

        this.socket.connect();

        this.socket.onConnect().subscribe((message) => {
          console.log('socket onConnect', message);

          this.socket.joinTable(this.tableCode);
        });

        this.socket.onUsers().subscribe((data) => {
          console.log('socket onUsers', data);
        });
      },
      { phase: AfterRenderPhase.Write },
    );
  }

  tableCode: string = '';

  ngOnInit(): void {
    console.log('ngOnInit');

    this.route.paramMap.subscribe((paramMap) => {
      this.tableCode = paramMap.get('code')!;
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiHttpService } from '../services/api-http.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiHttpService,
  ) {}

  tableCode: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.tableCode = paramMap.get('code')!;

      this.api.getTableByCode(this.tableCode).subscribe((data) => {
        console.log(data);
      });
    });
  }
}

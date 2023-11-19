import { AfterRenderPhase, Component, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { Logger } from '../utils/logger/logger';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {
    Logger.d('teste');

    afterNextRender(
      () => {
        Logger.d(['afterNextRender']);

        if (this.cookieService.get('currentTableCode') != '') {
          this.router.navigate(['/session']);
        }
      },
      { phase: AfterRenderPhase.Write }
    );
  }
  count: number = 0;

  countArray: number[] = [];

  mainImage: string =
    'https://firebasestorage.googleapis.com/v0/b/quick-order-16.appspot.com/o/Screenshot%202023-06-13%20at%2019.32.31.png?alt=media&token=c3711111-18aa-4d2d-b6a1-e41051d8642a';

  onclick() {
    this.count++;
    this.countArray.push(this.count);
  }

  title = 'smart-menu';
}

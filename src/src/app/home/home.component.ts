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
}

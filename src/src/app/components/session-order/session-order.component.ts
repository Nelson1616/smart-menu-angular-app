import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SessionOrder } from '../../models/session-order/session-order';
import { SessionUser } from '../../models/session-user/session-user';

@Component({
  selector: 'app-session-order',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './session-order.component.html',
  styleUrl: './session-order.component.css',
})
export class SessionOrderComponent {
  @Input() sessionOrder: SessionOrder | null = null;
  @Input() currentSessionUser: SessionUser | null = null;
}

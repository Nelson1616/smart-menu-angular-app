import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SessionOrder } from '../../models/session-order/session-order';
import { SessionUser } from '../../models/session-user/session-user';
import { SessionUserComponent } from '../session-user/session-user/session-user.component';

@Component({
  selector: 'app-session-order',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SessionUserComponent],
  templateUrl: './session-order.component.html',
  styleUrl: './session-order.component.css',
})
export class SessionOrderComponent {
  @Input() sessionOrder: SessionOrder | null = null;
  @Input() currentSessionUser: SessionUser | null = null;

  @Output() helpWithOrderEventEmitter = new EventEmitter<number>();
  @Output() notHelpWithOrderEventEmitter = new EventEmitter<number>();

  allowAction: boolean = true;

  verifyUserInOrder(): boolean {
    if (this.sessionOrder != null && this.currentSessionUser != null) {
      return this.sessionOrder!.sessionOrderUsers.some(
        (el) => el.sessionUserId == this.currentSessionUser!.id
      );
    }

    return false;
  }

  verifyOrderAvailable(): boolean {
    return this.sessionOrder!.statusId != 0 && this.sessionOrder!.statusId != 4;
  }

  helpWithOrder() {
    if (this.allowAction) {
      this.allowAction = false;

      this.helpWithOrderEventEmitter.emit(this.sessionOrder!.id);

      setTimeout(() => {
        this.allowAction = true;
      }, 3000);
    }
  }

  notHelpWithOrder() {
    if (this.allowAction) {
      this.allowAction = false;

      this.notHelpWithOrderEventEmitter.emit(this.sessionOrder!.id);

      setTimeout(() => {
        this.allowAction = true;
      }, 3000);
    }
  }
}

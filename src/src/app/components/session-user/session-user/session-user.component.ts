import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SessionUser } from '../../../models/session-user/session-user';

@Component({
  selector: 'app-session-user',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './session-user.component.html',
  styleUrl: './session-user.component.css',
})
export class SessionUserComponent {
  @Input() sessionUser: SessionUser | null = null;
}

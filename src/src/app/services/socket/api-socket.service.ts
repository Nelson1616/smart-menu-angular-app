import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ApiSocketService {
  private mainUrl: string = 'https://smartmenuapi.nntech.online';

  private socket: Socket;

  constructor() {
    this.socket = io(this.mainUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: false,
      reconnection: false,
    });
  }

  connect() {
    if (this.socket.disconnected) {
      this.socket.connect();
    }
  }

  disconnect() {
    this.socket.disconnect();
  }

  onConnect(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('connect', () => {
        observer.next('connected');
      });
    });
  }

  onError(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('error', (msg) => {
        observer.next(msg);
      });
    });
  }

  onUsers() {
    return new Observable<{ session: unknown; sessionUsers: unknown[] }>(
      (observer) => {
        this.socket.on('users', (data) => {
          observer.next(data);
        });
      }
    );
  }

  onOrders() {
    return new Observable<{ session: unknown; sessionOrders: unknown[] }>(
      (observer) => {
        this.socket.on('orders', (data) => {
          observer.next(data);
        });
      }
    );
  }

  joinTable(tableCode: string) {
    this.socket.emit('join_table', {
      table_code: tableCode,
    });
  }

  joinSession(sessionUserId: number) {
    this.socket.emit('join_session', {
      session_user_id: sessionUserId,
    });
  }

  callCaiter(sessionUserId: number) {
    this.socket.emit('call_waiter', {
      session_user_id: sessionUserId,
    });
  }

  makeOrder(sessionUserId: number, productId: number, quantity: number) {
    this.socket.emit('make_order', {
      session_user_id: sessionUserId,
      product_id: productId,
      quantity: quantity,
    });
  }

  helpWithOrder(sessionUserId: number, sessionOrderId: number) {
    this.socket.emit('help_with_order', {
      session_user_id: sessionUserId,
      session_order_id: sessionOrderId,
    });
  }

  notHelpWithOrder(sessionUserId: number, sessionOrderId: number) {
    this.socket.emit('not_help_with_order', {
      session_user_id: sessionUserId,
      session_order_id: sessionOrderId,
    });
  }
}

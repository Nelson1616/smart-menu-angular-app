import { Injectable } from '@angular/core';
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

    console.log('is socket connected', this.socket.connected);
  }

  disconnect() {
    this.socket.disconnect();

    console.log('is socket connected', this.socket.connected);
  }
}

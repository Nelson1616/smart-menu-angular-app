import {
  AfterRenderPhase,
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  afterNextRender,
  effect,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Table } from '../models/table/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiHttpService } from '../services/http/api-http.service';
import { ApiSocketService } from '../services/socket/api-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Logger } from '../utils/logger/logger';
import { SessionUser } from '../models/session-user/session-user';
import { SessionOrder } from '../models/session-order/session-order';
import { ProductComponent } from '../components/product/product.component';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ProductComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent implements OnInit, OnDestroy {
  tableCode: string = '';
  currentSessionUserId: number = 0;

  currentSessionUser: SessionUser | null = null;
  currentSessionUserImagePath: string = '';
  table: Table | null = null;
  sessionUsers: WritableSignal<SessionUser[]> = signal([]);
  sessionOrders: WritableSignal<SessionOrder[]> = signal([]);

  enableWaiterCall: boolean = true;

  onProductsPage: boolean = true;

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

        if (this.tableCode == '' || this.currentSessionUserId == 0) {
          this.cookieService.deleteAll();
          router.navigate(['/']);
        } else {
          this.setupTableData();

          this.setupSocket();
        }
      },
      { phase: AfterRenderPhase.Write }
    );

    effect(() => {
      Logger.d(['sessionUsers siginal', this.sessionUsers()]);
      Logger.d(['sessionOrders siginal', this.sessionOrders()]);
    });
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

        this.cookieService.deleteAll('/');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      }
    });
  }

  setupSocket() {
    this.socket.connect();

    this.socket.onConnect().subscribe((message) => {
      Logger.d(['socket onConnect', message]);

      this.socket.joinSession(this.currentSessionUserId);
    });

    this.socket.onError().subscribe((message) => {
      Logger.d(['socket onError', message]);

      this.toastr.error(message, 'Erro');

      this.cookieService.deleteAll('/');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    });

    this.socket.onUsers().subscribe((data) => {
      Logger.d(['socket onUsers', data.sessionUsers]);

      this.sessionUsers.set([]);

      const newSessionUsers: SessionUser[] = [];

      data.sessionUsers.forEach((sessionUserObj) => {
        try {
          const sessionUser: SessionUser = SessionUser.parse(
            JSON.stringify(sessionUserObj)
          );

          if (sessionUser.id == this.currentSessionUserId) {
            this.currentSessionUser = sessionUser;
            this.currentSessionUserImagePath = `/assets/images/avatar_${
              this.currentSessionUser!.user!.imageid
            }.png`;
          }

          newSessionUsers.push(sessionUser);
        } catch (e) {
          Logger.d((e as Error).message);
        }
      });

      this.sessionUsers.set(newSessionUsers);
    });

    this.socket.onOrders().subscribe((data) => {
      Logger.d(['socket onOrders', data.sessionOrders]);

      this.sessionOrders.set([]);

      const newSessionOrders: SessionOrder[] = [];

      data.sessionOrders.forEach((sessionOrderObj) => {
        try {
          const sessionOrder: SessionOrder = SessionOrder.parse(
            JSON.stringify(sessionOrderObj)
          );

          newSessionOrders.push(sessionOrder);
        } catch (e) {
          Logger.d((e as Error).message);
        }
      });

      this.sessionOrders.set(newSessionOrders);
    });
  }

  logout() {
    try {
      this.toastr.error('Saindo da sessão.', 'Logout');

      this.cookieService.deleteAll('/');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    } catch (e) {
      Logger.d((e as Error).message);
    }
  }

  makeWaiterCall() {
    try {
      if (this.enableWaiterCall) {
        this.toastr.success('Aguarde o atendimento.', 'Chamando Garçom');

        this.enableWaiterCall = false;

        this.socket.callCaiter(this.currentSessionUserId);

        setInterval(() => {
          this.enableWaiterCall = true;
        }, 5000);
      }
    } catch (e) {
      Logger.d((e as Error).message);
    }
  }

  makeOrder(productData: { productId: number; quantity: number }) {
    try {
      Logger.d(productData);

      this.socket.makeOrder(
        this.currentSessionUserId,
        productData.productId,
        productData.quantity
      );

      this.toastr.success(
        'Aguarde enquanto seu pedido é preparado.',
        'Pedido Feito'
      );
    } catch (e) {
      Logger.d((e as Error).message);
    }
  }

  switchPage(product: boolean) {
    this.onProductsPage = product;
  }

  ngOnInit(): void {
    this.tableCode = this.cookieService.get('currentTableCode');
    this.currentSessionUserId = Number(
      this.cookieService.get('currentSessionUserId')
    );
  }

  ngOnDestroy(): void {}
}

import { Product } from '../product/product';
import { SessionOrderUser } from '../session-order-user/session-order-user';

export class SessionOrder {
  constructor(
    public id: number,
    public statusId: number,
    public sessionId: number,
    public productId: number,
    public quantity: number,
    public amount: number,
    public amountLeft: number,
    public createdAt: string,
    public updatedAt: string,
    public json: string,
    public product: Product | null,
    public sessionOrderUsers: SessionOrderUser[]
  ) {}

  static parse(json: string): SessionOrder {
    const objectJson = JSON.parse(json);

    if (objectJson.id == null) {
      throw new Error('id is requeired');
    }

    if (objectJson.status_id == null) {
      throw new Error('status_id is requeired');
    }

    if (objectJson.session_id == null) {
      throw new Error('session_id is requeired');
    }

    if (objectJson.product_id == null) {
      throw new Error('product_id is requeired');
    }

    if (objectJson.quantity == null) {
      throw new Error('quantity is requeired');
    }

    if (objectJson.amount == null) {
      throw new Error('amount is requeired');
    }

    if (objectJson.amount_left == null) {
      throw new Error('amount_left is requeired');
    }

    if (objectJson.created_at == null) {
      throw new Error('created_at is requeired');
    }

    if (objectJson.updated_at == null) {
      throw new Error('updated_at is requeired');
    }

    let product: Product | null = null;

    if (objectJson.product != null) {
      product = Product.parse(JSON.stringify(objectJson.product));
    }

    const sessionOrderUsers: SessionOrderUser[] = [];

    if (objectJson.sessionOrderUser != null) {
      objectJson.sessionOrderUser.forEach((sessionOrderUser: unknown) => {
        sessionOrderUsers.push(
          SessionOrderUser.parse(JSON.stringify(sessionOrderUser))
        );
      });
    }

    return new SessionOrder(
      objectJson.id,
      objectJson.status_id,
      objectJson.session_id,
      objectJson.product_id,
      objectJson.quantity,
      objectJson.amount,
      objectJson.amount_left,
      objectJson.created_at,
      objectJson.updated_at,
      json,
      product,
      sessionOrderUsers
    );
  }
}

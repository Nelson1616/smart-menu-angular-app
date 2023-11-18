import { User } from '../user/user';

export class SessionUser {
  constructor(
    public id: number,
    public statusId: number,
    public sessionId: number,
    public userId: number,
    public amountTopay: number,
    public createdAt: string,
    public updatedAt: string,
    public json: string,
    public user: User | null
  ) {}

  static parse(json: string): SessionUser {
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

    if (objectJson.user_id == null) {
      throw new Error('user_id is requeired');
    }

    if (objectJson.amount_to_pay == null) {
      throw new Error('amount_to_pay is requeired');
    }

    if (objectJson.created_at == null) {
      throw new Error('created_at is requeired');
    }

    if (objectJson.updated_at == null) {
      throw new Error('updated_at is requeired');
    }

    let user: User | null = null;

    if (objectJson.user != null) {
      user = User.parse(JSON.stringify(objectJson.user));
    }

    return new SessionUser(
      objectJson.id,
      objectJson.status_id,
      objectJson.session_id,
      objectJson.user_id,
      objectJson.amount_to_pay,
      objectJson.created_at,
      objectJson.updated_at,
      json,
      user
    );
  }
}

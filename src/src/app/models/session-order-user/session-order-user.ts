import { SessionUser } from '../session-user/session-user';

export class SessionOrderUser {
  constructor(
    public id: number,
    public statusId: number,
    public sessionOrderId: number,
    public sessionUserId: number,
    public createdAt: string,
    public updatedAt: string,
    public json: string,
    public sessionUser: SessionUser | null
  ) {}

  static parse(json: string): SessionOrderUser {
    const objectJson = JSON.parse(json);

    if (objectJson.id == null) {
      throw new Error('id is requeired');
    }

    if (objectJson.status_id == null) {
      throw new Error('status_id is requeired');
    }

    if (objectJson.session_order_id == null) {
      throw new Error('session_order_id is requeired');
    }

    if (objectJson.session_user_id == null) {
      throw new Error('session_user_id is requeired');
    }

    if (objectJson.created_at == null) {
      throw new Error('created_at is requeired');
    }

    if (objectJson.updated_at == null) {
      throw new Error('updated_at is requeired');
    }

    let sessionUser: SessionUser | null = null;

    if (objectJson.sessionUser != null) {
      sessionUser = SessionUser.parse(JSON.stringify(objectJson.sessionUser));
    }

    return new SessionOrderUser(
      objectJson.id,
      objectJson.status_id,
      objectJson.session_order_id,
      objectJson.session_user_id,
      objectJson.created_at,
      objectJson.updated_at,
      json,
      sessionUser
    );
  }
}

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string | null,
    public password: string | null,
    public statusId: number,
    public imageid: number,
    public createdAt: string,
    public updatedAt: string,
    public json: string
  ) {}

  static parse(json: string): User {
    const objectJson = JSON.parse(json);

    if (objectJson.id == null) {
      throw new Error('id is requeired');
    }

    if (objectJson.name == null) {
      throw new Error('name is requeired');
    }

    if (objectJson.status_id == null) {
      throw new Error('status_id is requeired');
    }

    if (objectJson.image_id == null) {
      throw new Error('image_id is requeired');
    }

    if (objectJson.created_at == null) {
      throw new Error('created_at is requeired');
    }

    if (objectJson.updated_at == null) {
      throw new Error('updated_at is requeired');
    }

    return new User(
      objectJson.id,
      objectJson.name,
      objectJson.email,
      objectJson.password,
      objectJson.status_id,
      objectJson.image_id,
      objectJson.created_at,
      objectJson.updated_at,
      json
    );
  }

  getName(): string {
    return this.name;
  }
}

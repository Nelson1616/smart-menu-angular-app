import { Restaurant } from '../restaurant/restaurant';

export class Table {
  constructor(
    public id: number,
    public statusId: number,
    public restaurantId: number,
    public enterCode: string,
    public number: number,
    public createdAt: string,
    public updatedAt: string,
    public json: string,
    public restaurant: Restaurant | null
  ) {}

  static parse(json: string): Table {
    const objectJson = JSON.parse(json);

    if (objectJson.id == null) {
      throw new Error('id is requeired');
    }

    if (objectJson.status_id == null) {
      throw new Error('status_id is requeired');
    }

    if (objectJson.restaurant_id == null) {
      throw new Error('restaurant_id is requeired');
    }

    if (objectJson.enter_code == null) {
      throw new Error('enter_code is requeired');
    }

    if (objectJson.number == null) {
      throw new Error('number is requeired');
    }

    if (objectJson.created_at == null) {
      throw new Error('created_at is requeired');
    }

    if (objectJson.updated_at == null) {
      throw new Error('updated_at is requeired');
    }

    let restaurant: Restaurant | null = null;

    if (objectJson.restaurant != null) {
      restaurant = Restaurant.parse(JSON.stringify(objectJson.restaurant));
    }

    return new Table(
      objectJson.id,
      objectJson.status_id,
      objectJson.restaurant_id,
      objectJson.enter_code,
      objectJson.number,
      objectJson.created_at,
      objectJson.updated_at,
      json,
      restaurant
    );
  }
}

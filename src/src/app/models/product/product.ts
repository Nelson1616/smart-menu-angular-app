import { Restaurant } from '../restaurant/restaurant';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public image: string,
    public statusId: number,
    public restaurantId: number,
    public createdAt: string,
    public updatedAt: string,
    public json: string,
    public restaurant: Restaurant | null
  ) {}

  static parse(json: string): Product {
    const objectJson = JSON.parse(json);

    if (objectJson.id == null) {
      throw new Error('id is requeired');
    }

    if (objectJson.name == null) {
      throw new Error('name is requeired');
    }

    if (objectJson.description == null) {
      throw new Error('description is requeired');
    }

    if (objectJson.price == null) {
      throw new Error('price is requeired');
    }

    if (objectJson.image == null) {
      throw new Error('image is requeired');
    }

    if (objectJson.status_id == null) {
      throw new Error('status_id is requeired');
    }

    if (objectJson.restaurant_id == null) {
      throw new Error('restaurant_id is requeired');
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

    return new Product(
      objectJson.id,
      objectJson.name,
      objectJson.description,
      objectJson.price,
      objectJson.image,
      objectJson.status_id,
      objectJson.restaurant_id,
      objectJson.created_at,
      objectJson.updated_at,
      json,
      restaurant
    );
  }
}

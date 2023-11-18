import { Product } from '../product/product';

export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public image: string,
    public statusId: number,
    public primaryColor: string,
    public secondaryColor: string,
    public tertiaryColor: string,
    public createdAt: string,
    public updatedAt: string,
    public json: string,
    public products: Product[]
  ) {}

  static parse(json: string): Restaurant {
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

    if (objectJson.image == null) {
      throw new Error('image is requeired');
    }

    if (objectJson.status_id == null) {
      throw new Error('status_id is requeired');
    }

    if (objectJson.primary_color == null) {
      throw new Error('primary_color is requeired');
    }

    if (objectJson.secondary_color == null) {
      throw new Error('secondary_color is requeired');
    }

    if (objectJson.tertiaty_color == null) {
      throw new Error('tertiaty_color is requeired');
    }

    if (objectJson.created_at == null) {
      throw new Error('created_at is requeired');
    }

    if (objectJson.updated_at == null) {
      throw new Error('updated_at is requeired');
    }

    const products: Product[] = [];

    if (objectJson.products != null) {
      objectJson.products.forEach((product: unknown) => {
        products.push(Product.parse(JSON.stringify(product)));
      });
    }

    return new Restaurant(
      objectJson.id,
      objectJson.name,
      objectJson.description,
      objectJson.image,
      objectJson.status_id,
      objectJson.primary_color,
      objectJson.secondary_color,
      objectJson.tertiaty_color,
      objectJson.created_at,
      objectJson.updated_at,
      json,
      products
    );
  }
}

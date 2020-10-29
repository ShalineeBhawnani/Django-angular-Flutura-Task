import { Product } from './product';

export class CartItem {
  id: number;
  product_id: number;
  user_id: string;
  quantity: number;
  price: number;

  constructor(id: number, product: Product, quantity = 1) {
    this.id = id;
    this.product_id = product.id;
    this.user_id = product.name;
    this.price = product.price;
    this.quantity = quantity;
  }
}
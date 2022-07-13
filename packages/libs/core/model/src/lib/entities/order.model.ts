import { ProductOrder } from "./product.model";

export interface Order {
  id?: string;
  orderedProducts: ProductOrder[];
  name: string;
  table: string;
  comment: string;
}

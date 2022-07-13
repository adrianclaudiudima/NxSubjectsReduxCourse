import { ProductType } from "@ngrx-orders-workshop/libs/core/model";

export interface CategorySummary {
  name: string;
  image: string;
  type: ProductType;
}

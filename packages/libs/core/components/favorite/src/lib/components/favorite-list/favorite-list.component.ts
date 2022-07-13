import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";

@Component({
  selector: "app-favorite-list",
  templateUrl: "favorite-list.component.html"
})
export class FavoriteListComponent {

  @Input()
  products: Array<Product> = [];

  @Output()
  navigateToProducts: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  addProductToCart: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();

  @Output()
  addAllProductsToCart: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  removeProductFromFavorite: EventEmitter<Product> = new EventEmitter<Product>();

  onAddProducts() {
    this.navigateToProducts.emit(true);
  }

  addToCart(product: Product) {
    this.addProductToCart.emit({ product: product, quantity: 1 });
  }

  removeProduct(product: Product) {
    this.removeProductFromFavorite.emit(product);
  }

}

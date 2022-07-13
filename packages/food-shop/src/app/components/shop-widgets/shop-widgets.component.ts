import { Component } from "@angular/core";
import { Product, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";
import { CartStateService } from "../../services/cart-state.service";
import { FavoriteStateService } from "../../services/favorite-state.service";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-shop-widgets",
  templateUrl: "shop-widgets.component.html"
})
export class ShopWidgetsComponent {

  cartState$: Observable<{ products: ProductOrder[], totalQuantity: number }>;
  favoriteState$: Observable<Array<Product>>;

  constructor(private cartStateService: CartStateService,
              private favoriteStateService: FavoriteStateService) {
    this.favoriteState$ = this.favoriteStateService.favoriteProducts$;
    this.cartState$ = this.cartStateService.productsInCart$.pipe(
      map<ProductOrder[], { products: ProductOrder[], totalQuantity: number }>(products => ({
        products: products,
        totalQuantity: products.length > 0 ? products.map(prod => prod.quantity).reduce((previousValue, currentValue) => previousValue + currentValue) : 0
      }))
    );

  }

  handleRemoveProductFromCart(productOrder: ProductOrder): void {
    this.cartStateService.removeProductFromCart(productOrder);
  }

  handleUpdateProductQuantity(payload: { product: Product; quantity: number }) {
    this.cartStateService.updateQuantity(payload.product, payload.quantity);
  }

  handleAddAllProductsToCart(products: Product[]) {
    this.cartStateService.addMultipleProductsToCart(products.map(p => ({ product: p, quantity: 1 })));
    this.favoriteStateService.removeAllProducts();
  }

  handleRemoveProductFromFavorite(product: Product) {
    this.favoriteStateService.removeProduct(product);
  }

  handleAddProductToCart(productOrder: ProductOrder) {
    this.cartStateService.addProductToCart(productOrder);
    this.favoriteStateService.removeProduct(productOrder.product);
  }

}

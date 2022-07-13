import { Injectable } from "@angular/core";
import { CartStateService } from "./cart-state.service";
import { environment } from "../../environments/environment";
import { map, Observable, tap } from "rxjs";
import { CartCheckoutModel, getCartPriceModel } from "@ngrx-orders-workshop/libs/core/utility/cart-utility";
import { OrdersApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { Order } from "@ngrx-orders-workshop/libs/core/model";


@Injectable()
export class CheckoutStateService {

  private vatRate = environment.vatRatePercentage;
  private serviceChargePercentage = environment.serviceChargePercentage;

  checkoutSummary$: Observable<CartCheckoutModel>;

  constructor(private cartState: CartStateService, private ordersApiService: OrdersApiService) {
    this.checkoutSummary$ = this.cartState.productsInCart$.pipe(
      map(products => getCartPriceModel(products, this.vatRate, this.serviceChargePercentage))
    );
  }

  createOrder(order: Order) {
    return this.ordersApiService.createOrder(order).pipe(
      tap((_) => this.cartState.removeAllProductsFromCart())
    );
  }

}

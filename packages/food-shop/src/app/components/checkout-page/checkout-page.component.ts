import { Component } from "@angular/core";
import { CartStateService } from "../../services/cart-state.service";
import { BehaviorSubject, combineLatest, map, Observable, Subject, take, tap } from "rxjs";
import { Order, OrderPaymentSummaryExtraFee, Product, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";
import { CardData } from "@ngrx-orders-workshop/libs/core/components/card-selection";
import { getCartPriceFeeModel, mapPaymentFeeFromCardData } from "@ngrx-orders-workshop/libs/core/utility/cart-utility";
import { CheckoutStateService } from "../../services/checkout-state.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout-page",
  templateUrl: "checkout-page.component.html"
})
export class CheckoutPageComponent {

  checkoutData$: Observable<{
    orderPaymentSummaryExtraFee: OrderPaymentSummaryExtraFee,
    cartProducts: Array<ProductOrder>
  }>;
  cardData: CardData[] = [
    { name: "Card", description: "Card transaction fee", value: 0.00, valueDescription: "$0.00", selected: true },
    { name: "Cash", description: "Cash processing fee", value: 2.50, valueDescription: "$2.50", selected: false }
  ];

  private feeSubject: Subject<number> = new BehaviorSubject<number>(mapPaymentFeeFromCardData(this.cardData));

  constructor(private cartState: CartStateService, private checkoutService: CheckoutStateService, private router: Router) {
    this.checkoutData$ = combineLatest([
      combineLatest([
        this.checkoutService.checkoutSummary$,
        this.feeSubject
      ]).pipe(
        map(([checkoutSummary, paymentFee]) => {
          return getCartPriceFeeModel(checkoutSummary, paymentFee);
        })
      ), cartState.productsInCart$.pipe(
        tap(products => {
          if (products?.length === 0) {
            this.router.navigate(["/"]);
          }
        })
      )
    ]).pipe(
      map(([orderPaymentSummaryExtraFee, cartProducts]) => ({ orderPaymentSummaryExtraFee, cartProducts }))
    );
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.cartState.updateQuantity(product, quantity);
    }

  }

  handlePaymentMethodChange(cardData: CardData[]) {
    this.feeSubject.next(mapPaymentFeeFromCardData(cardData));
  }

  handleCreateOrder(order: Order) {
    this.checkoutService.createOrder(order).pipe(
      take(1)
    ).subscribe(() => {
      this.router.navigate(["/orders"]);
    });
  }

  handleUpdateProductQuantity(productOrder: { product: Product; quantity: number }) {
    this.cartState.updateQuantity(productOrder.product, productOrder.quantity);
  }

  handleRemoveProduct(product: ProductOrder) {
    this.cartState.removeProductFromCart(product);
  }

}

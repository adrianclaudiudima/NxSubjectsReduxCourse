import { Component } from "@angular/core";
import { CartStateService } from "../../services/cart-state.service";
import { BehaviorSubject, combineLatest, map, Observable, Subject, switchMap, take } from "rxjs";
import { Product, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";
import { CardData } from "@ngrx-orders-workshop/libs/core/components/card-selection";
import { buildCheckoutForm, getCartPriceFeeModel, mapPaymentFeeFromCardData } from "@ngrx-orders-workshop/libs/core/utility/cart-utility";
import { CheckoutStateService } from "../../services/checkout-state.service";
import { CartCheckoutPaymentFeeModel } from "@ngrx-orders-workshop/libs/core/utility/cart-utility";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "checkout.component.html"
})
export class CheckoutComponent {

  cartProducts$: Observable<Array<ProductOrder>>;
  checkoutPrice$: Observable<CartCheckoutPaymentFeeModel>;
  checkoutFormGroup: FormGroup = buildCheckoutForm();

  cardData: CardData[] = [
    { name: "Card", description: "Card transaction fee", value: 0.00, valueDescription: "$0.00", selected: true },
    { name: "Cash", description: "Cash processing fee", value: 2.50, valueDescription: "$2.50", selected: false }
  ];

  private feeSubject: Subject<number> = new BehaviorSubject<number>(mapPaymentFeeFromCardData(this.cardData));

  constructor(private cartState: CartStateService, private checkoutService: CheckoutStateService, private router: Router) {
    this.cartProducts$ = cartState.productsInCart$;
    this.checkoutPrice$ = combineLatest([
      this.checkoutService.checkoutSummary$,
      this.feeSubject
    ]).pipe(
      map(([checkoutSummary, paymentFee]) => {
        return getCartPriceFeeModel(checkoutSummary, paymentFee);
      })
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

  submitOrder(checkoutPrice: CartCheckoutPaymentFeeModel): void {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    } else {
      const checkoutForm = this.checkoutFormGroup.value;
      this.cartProducts$.pipe(
        take(1),
        switchMap(cartProducts => this.checkoutService.createOrder({
          orderedProducts: cartProducts, name:
          checkoutForm.name,
          table: checkoutForm.table,
          comment: checkoutForm.comment
        })),
        take(1)
      ).subscribe(() => {
        this.router.navigate(["/"]);

      });

    }
  }

}

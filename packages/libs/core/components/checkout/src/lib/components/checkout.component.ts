import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Order, OrderPaymentSummaryExtraFee, OrderStatus, Product, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";
import { buildCheckoutForm } from "@ngrx-orders-workshop/libs/core/utility/cart-utility";
import { FormGroup } from "@angular/forms";
import { CardData } from "@ngrx-orders-workshop/libs/core/components/card-selection";

@Component({
  selector: "app-checkout",
  templateUrl: "checkout.component.html"
})
export class CheckoutComponent {

  checkoutFormGroup: FormGroup;

  constructor() {
    this.checkoutFormGroup = buildCheckoutForm();
  }

  @Input()
  cartProducts: Array<ProductOrder> = [];

  @Input()
  orderPaymentSummaryExtraFee!: OrderPaymentSummaryExtraFee;

  @Input()
  paymentMethodCards: CardData[] = [];

  @Input()
  paymentMethodTitle: string = "";

  @Output()
  updateProductQuantity: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();

  @Output()
  createOrder: EventEmitter<Order> = new EventEmitter<Order>();

  @Output()
  paymentMethodChanged: EventEmitter<CardData[]> = new EventEmitter<CardData[]>();

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.updateProductQuantity.emit({ product, quantity });
    }
  }

  submitOrder() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    } else {
      const customerInfo = this.checkoutFormGroup.value;
      this.createOrder.emit({
        orderedProducts: this.cartProducts,
        name: customerInfo.name,
        comment: customerInfo.comment,
        table: customerInfo.table,
        orderPaymentSummaryExtraFee: this.orderPaymentSummaryExtraFee,
        // workaround since we don't have a real backend
        orderStatus: OrderStatus.ORDER_NEW,
        orderDate: new Date()
      });
    }
  }

  handlePaymentMethodChange(paymentMethodsCard: CardData[]) {
    this.paymentMethodCards = paymentMethodsCard;
    this.paymentMethodChanged.emit(paymentMethodsCard);
  }

}

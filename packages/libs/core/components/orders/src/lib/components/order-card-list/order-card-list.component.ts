import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";

@Component({
  selector: "app-order-card-list",
  templateUrl: "order-card-list.component.html"
})
export class OrderCardListComponent {

  ORDER_STATUS = OrderStatus;

  @Input()
  orders: Array<Order> = [];

  @Output()
  orderClicked: EventEmitter<Order> = new EventEmitter<Order>();

}

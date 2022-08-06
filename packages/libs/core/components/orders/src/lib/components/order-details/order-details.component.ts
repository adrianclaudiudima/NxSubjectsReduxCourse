import { Component, Input } from "@angular/core";
import { Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";

@Component({
  selector: "app-order-details",
  templateUrl: "order-details.component.html"
})
export class OrderDetailsComponent {

  @Input()
  order!: Order;

}

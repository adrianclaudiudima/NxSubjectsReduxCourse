import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "@ngrx-orders-workshop/libs/core/model";
import { OrdersApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-your-orders",
  templateUrl: "your-orders.component.html"
})
export class YourOrdersComponent {

  orders$: Observable<Order[]>;

  constructor(private orderService: OrdersApiService, private router: Router) {
    this.orders$ = this.orderService.loadOrders();
  }

  selectOrder(order: Order) {
    this.router.navigate(["orders", order.id]);
  }
}

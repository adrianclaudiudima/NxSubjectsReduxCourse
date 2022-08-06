import { Component } from "@angular/core";
import { OrdersApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { map, Observable } from "rxjs";
import { Order } from "@ngrx-orders-workshop/libs/core/model";


@Component({
  selector: "app-orders-status",
  templateUrl: "orders-status.component.html"
})
export class OrdersStatusComponent {

  orders$: Observable<Order>;

  constructor(private orderService: OrdersApiService) {
    this.orders$ = this.orderService.loadOrders().pipe(
      map(v => v[0])
    );
  }

}

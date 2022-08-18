import { Component } from "@angular/core";
import { Order } from "@ngrx-orders-workshop/libs/core/model";
import { filter, map, Observable, switchMap, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";


@Component({
  selector: "app-your-order-details",
  templateUrl: "your-order-detail.components.html"
})
export class YourOrderDetailComponents {

  order$: Observable<Order>;

  constructor(private router: Router, private activatedRute: ActivatedRoute, private ordersApiService: OrdersApiService) {
    this.order$ = this.activatedRute.paramMap.pipe(
      map(paramMap => paramMap.get("id")),
      tap(id => {
        if (!id) {
          this.router.navigate(["/orders"]);
        }
      }),
      filter(id => !!id),
      switchMap(orderId => ordersApiService.loadOrderById(orderId as string))
    );

  }


}

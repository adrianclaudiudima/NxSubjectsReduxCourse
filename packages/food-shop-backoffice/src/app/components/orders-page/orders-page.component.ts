import { Component } from "@angular/core";
import { BackofficeOrdersStateService, OrdersState } from "../../services/backoffice-orders-state.service";
import { Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";
import { Observable } from "rxjs";


@Component({
  selector: "app-orders-page",
  templateUrl: "orders-page.component.html",
  styleUrls: ["orders-page.component.scss"]
})
export class OrdersPageComponent {

  orders$: Observable<OrdersState>;
  acceptedOrders$: Observable<OrdersState>;
  newOrders$: Observable<OrdersState>;
  processingOrders$: Observable<OrdersState>;
  canceledOrders: Observable<OrdersState>;
  deliveredOrders$: Observable<OrdersState>;
  selectedIndex = 0;

  constructor(private backofficeOrdersState: BackofficeOrdersStateService) {
    this.orders$ = backofficeOrdersState.ordersState$;
    this.acceptedOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_ACCEPTED);
    this.newOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_NEW);
    this.processingOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_PROCESSING);
    this.canceledOrders = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_CANCELED);
    this.deliveredOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_DELIVERED);
    this.backofficeOrdersState.loadAllOrders();
  }

  updateOrderStatus(payload: { order: Order; newOrderStatus: OrderStatus }) {
    this.backofficeOrdersState.updateOrderStatus(payload.order, payload.newOrderStatus);
  }

  reloadOrders(): void {
    this.backofficeOrdersState.loadAllOrders();
  }

}

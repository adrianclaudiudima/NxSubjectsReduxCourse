import { Component } from "@angular/core";
import { StatsRow } from "@ngrx-orders-workshop/libs/core/components/stats";
import { filter, map, Observable } from "rxjs";
import { Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";
import { BackofficeOrdersStateService, OrdersState } from "../../services/backoffice-orders-state.service";
import { getFirstRowStats, getSecondRowSats } from "@ngrx-orders-workshop/libs/core/components/orders";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "dashboard-page.component.html"
})
export class DashboardPageComponent {

  orders$: Observable<OrdersState>;
  allCanceledDeliveredOrdersStats$: Observable<any>;
  newAcceptedProcessingOrdersStats$: Observable<any>;

  stats: StatsRow[] = [];

  constructor(private backofficeOrdersState: BackofficeOrdersStateService) {
    backofficeOrdersState.loadAllOrders();
    this.orders$ = backofficeOrdersState.ordersState$;
    this.allCanceledDeliveredOrdersStats$ = this.orders$.pipe(
      filter(ordersState => ordersState.paginatedOrders.domain.length > 0),
      map(ordersState => getFirstRowStats(ordersState.paginatedOrders.domain))
    );
    this.newAcceptedProcessingOrdersStats$ = this.orders$.pipe(
      filter(data => data.paginatedOrders.domain.length > 0),
      map(ordersState => getSecondRowSats(ordersState.paginatedOrders.domain))
    );
  }


  updateOrderStatus(payload: { order: Order; newOrderStatus: OrderStatus }) {
    this.backofficeOrdersState.updateOrderStatus(payload.order, payload.newOrderStatus);
  }

  reloadOrders(): void {
    this.backofficeOrdersState.loadAllOrders();
  }

}



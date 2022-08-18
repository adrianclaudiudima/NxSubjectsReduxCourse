import { Component } from "@angular/core";
import { StatsRow } from "@ngrx-orders-workshop/libs/core/components/stats";
import { filter, map, Observable, switchMap } from "rxjs";
import { Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";
import { BackofficeOrdersStateService, OrdersState } from "../../services/backoffice-orders-state.service";
import { getFirstRowStats, getSecondRowSats } from "@ngrx-orders-workshop/libs/core/components/orders";
import { Sort, SortDirection } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "dashboard-page.component.html"
})
export class DashboardPageComponent {

  ordersState$: Observable<OrdersState>;
  allCanceledDeliveredOrdersStats$: Observable<any>;
  newAcceptedProcessingOrdersStats$: Observable<any>;

  stats: StatsRow[] = [];

  constructor(
    private backofficeOrdersState: BackofficeOrdersStateService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {

    this.ordersState$ = this.activatedRouter.queryParamMap.pipe(
      map(queryParamMap => {
        const sortKey = queryParamMap.get("sortKey");
        const sortDirection = queryParamMap.get("sortDirection");
        if (sortKey !== null && sortKey !== "" && sortDirection !== null && sortDirection !== "") {
          this.backofficeOrdersState.sortOrdersOnlyOnFE({ direction: (sortDirection as SortDirection), active: sortKey });
        }
      }),
      switchMap(() => backofficeOrdersState.ordersStateSorted$)
    );

    backofficeOrdersState.loadAllOrders();

    this.allCanceledDeliveredOrdersStats$ = this.ordersState$.pipe(
      filter(ordersState => ordersState.paginatedOrders.domain.length > 0),
      map(ordersState => getFirstRowStats(ordersState.paginatedOrders.domain))
    );
    this.newAcceptedProcessingOrdersStats$ = this.ordersState$.pipe(
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

  handleSortChange(sort: Sort) {

    const sortChange: Partial<{ sortKey: string, sortDirection: string }> = {};
    if (sort.active !== "" && sort.direction !== "") {
      sortChange.sortKey = sort.active;
      sortChange.sortDirection = sort.direction;
    }
    this.backofficeOrdersState.sortOrdersOnlyOnFE(sort);
    this.router.navigate(["/"], { queryParams: sortChange });
  }
}



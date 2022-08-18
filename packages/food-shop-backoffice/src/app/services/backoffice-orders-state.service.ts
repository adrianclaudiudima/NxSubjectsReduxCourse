import { Injectable } from "@angular/core";
import { OrdersApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { DomainEntity, Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap } from "rxjs";
import { Sort } from "@angular/material/sort";

export interface PaginationConfig {
  length: number;
  pageIndex: number;
  pageSize: number;
}

export interface OrdersState {
  paginatedOrders: DomainEntity<Order[]>;
  paginationData: PaginationConfig;
  sort: Sort;
}

@Injectable()
export class BackofficeOrdersStateService {

  private ordersState: OrdersState = {
    paginatedOrders: { domain: [], requestStatus: { status: "NEW" } },
    paginationData: { length: 0, pageIndex: 0, pageSize: 10 },
    sort: { direction: "", active: "" }
  };

  private ordersSubject: Subject<OrdersState> = new BehaviorSubject(this.ordersState);
  public ordersState$: Observable<OrdersState> = this.ordersSubject.asObservable();
  public ordersStateSorted$: Observable<OrdersState> = this.ordersState$.pipe(
    map(state => {
      return {
        ...state,
        paginatedOrders: {
          ...state.paginatedOrders,
          domain: sortOrders([...state.paginatedOrders.domain], state.sort)
        }
      };

    })
  );

  constructor(private ordersApiService: OrdersApiService) {
  }

  public getOrdersFilteredByOrderStatus(orderStatus: OrderStatus): Observable<OrdersState> {
    return this.ordersState$.pipe(
      map(ordersState => {
        return {
          ...ordersState, paginatedOrders: {
            ...ordersState.paginatedOrders,
            domain: ordersState.paginatedOrders.domain.filter(x => x.orderStatus === orderStatus)
          }
        };
      })
    );
  }

  public loadAllOrders(): void {
    this.setPendingState();
    this.loadOrders().subscribe((state) => {
      this.ordersState = {
        ...this.ordersState,
        paginatedOrders: state
      };
      this.ordersSubject.next(this.ordersState);
    });
  }

  public loadOrdersPaginated(pageIndex: number, pageSize: number): void {
    this.setPendingState();
    this.ordersApiService.loadOrdersPaginated(pageIndex, pageSize).pipe(
      map<{ orders: Order[], totalCount: number }, OrdersState>(payload => ({
        ...this.ordersState,
        paginatedOrders: { domain: payload.orders, requestStatus: { status: "COMPLETED" } },
        paginationData: {
          ...this.ordersState.paginationData,
          length: payload.totalCount,
          pageSize,
          pageIndex
        }
      })),
      catchError(err => {
        const errorPayload: OrdersState = {
          paginatedOrders: {
            domain: [],
            requestStatus: {
              status: "ERROR",
              error: { message: "Something went wrong" }
            }
          },
          paginationData: { length: 0, pageIndex: 0, pageSize: 10 },
          sort: this.ordersState.sort
        };
        return of(errorPayload);
      })
    ).subscribe(value => {
      this.ordersState = value;
      this.ordersSubject.next(this.ordersState);
    });
  }

  updateOrderStatus(order: Order, newOrderStatus: OrderStatus) {
    this.setPendingState();
    this.ordersApiService.updateOrderStatus(order, newOrderStatus).pipe(
      switchMap(_ => this.loadOrders())
    ).subscribe((state) => {
      this.ordersState = {
        ...this.ordersState,
        paginatedOrders: state
      };
      this.ordersSubject.next(this.ordersState);
    });

  }

  private loadOrders(): Observable<DomainEntity<Order[]>> {
    return this.ordersApiService.loadOrders().pipe(
      map<Order[], DomainEntity<Order[]>>(orders => ({
        domain: orders, requestStatus: {
          status: "COMPLETED"
        }
      })),
      catchError(err => {
        const errorPayload: DomainEntity<Order[]> = {
          domain: [],
          requestStatus: {
            status: "ERROR",
            error: { message: "Something went wrong" }
          }
        };
        return of(errorPayload);
      })
    );
  }

  private setPendingState(): void {
    this.ordersState = {
      ...this.ordersState, paginatedOrders: {
        ...this.ordersState.paginatedOrders, requestStatus: {
          status: "PENDING"
        }
      }
    };
    this.ordersSubject.next(this.ordersState);
  }

  sortOrdersOnlyOnFE(sort: Sort): void {
    this.ordersState = {
      ...this.ordersState,
      sort
    };
    this.ordersSubject.next(this.ordersState);
  }

}


export const sortOrders = (orders: Order[], sort: Sort) => {
  if (sort.active !== "" && sort.direction !== "") {
    switch (sort.active) {
      case "orderId": {
        if (sort.direction === "asc") {
          return orders.sort((a, b) => a === b ? 0 : (a.id as string).localeCompare((b.id as string)) ? -1 : 1);
        } else {
          return orders.sort((a, b) => a === b ? 0 : (a.id as string).localeCompare((b.id as string)) ? 1 : -1);
        }

      }
      case "totalPrice": {
        if (sort.direction === "asc") {
          return orders.sort((a, b) =>
            a.orderPaymentSummaryExtraFee.total > b.orderPaymentSummaryExtraFee.total ? 1 :
              a.orderPaymentSummaryExtraFee.total < b.orderPaymentSummaryExtraFee.total ? -1 : 0
          );
        } else {
          return orders.sort((a, b) =>
            a.orderPaymentSummaryExtraFee.total > b.orderPaymentSummaryExtraFee.total ? -1 :
              a.orderPaymentSummaryExtraFee.total < b.orderPaymentSummaryExtraFee.total ? 1 : 0
          );

        }
      }
      case "orderDate": {
        if (sort.direction === "asc") {
          return orders.sort((a, b) => a.orderDate > b.orderDate ? -1 :
            a.orderDate < b.orderDate ? 1 : 0);
        } else {
          return orders.sort((a, b) => a.orderDate > b.orderDate ? 1 :
            a.orderDate < b.orderDate ? -1 : 0);
        }
      }
      default: {
        return orders;
      }
    }
  } else {
    return orders;
  }

};

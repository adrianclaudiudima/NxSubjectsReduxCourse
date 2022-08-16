import { Injectable } from "@angular/core";
import { OrdersApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { DomainEntity, Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";
import { BehaviorSubject, catchError, map, Observable, of, Subject, switchMap } from "rxjs";

export interface PaginationConfig {
  length: number;
  pageIndex: number;
  pageSize: number;
}


export interface OrdersState {
  paginatedOrders: DomainEntity<Order[]>;
  paginationData: PaginationConfig;
  sort: any;
}

@Injectable()
export class BackofficeOrdersStateService {

  private ordersState: OrdersState = {
    paginatedOrders: { domain: [], requestStatus: { status: "NEW" } },
    paginationData: { length: 0, pageIndex: 0, pageSize: 10 },
    sort: undefined
  };

  private ordersSubject: Subject<OrdersState> = new BehaviorSubject(this.ordersState);

  public ordersState$: Observable<OrdersState> = this.ordersSubject.asObservable();

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

  private setPendingState() {
    this.ordersState = {
      ...this.ordersState, paginatedOrders: {
        ...this.ordersState.paginatedOrders, requestStatus: {
          status: "PENDING"
        }
      }
    };
    this.ordersSubject.next(this.ordersState);
  }
}

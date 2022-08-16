import { Injectable } from "@angular/core";
import { OrdersApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { DomainEntity, Order } from "@ngrx-orders-workshop/libs/core/model";
import { BehaviorSubject, catchError, map, of, Subject } from "rxjs";

@Injectable()
export class OrdersStateService {


  private ordersState: DomainEntity<Order[]> = { domain: [], requestStatus: { status: "NEW" } };
  private ordersStateSubject: Subject<DomainEntity<Order[]>> = new BehaviorSubject<DomainEntity<Order[]>>(this.ordersState);
  public ordersState$ = this.ordersStateSubject.asObservable();

  constructor(private ordersApiService: OrdersApiService) {
  }

  public loadOrders(): void {
    this.ordersApiService.loadOrders().pipe(
      map(orders => {
        const ordersState: DomainEntity<Order[]> = {
          domain: orders,
          requestStatus: {
            status: "COMPLETED"
          }
        };
        return ordersState;
      }),
      catchError(err => {
        return of<DomainEntity<Order[]>>({
          domain: [],
          requestStatus: {
            status: "ERROR",
            error: { message: "Something went wrong, please try again later" }
          }
        });
      })
    ).subscribe(v => {
      this.ordersState = v;
      this.ordersStateSubject.next(this.ordersState);
    });
  }

}

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";
import { PaginationConfig } from "../../../../../../../food-shop-backoffice/src/app/services/backoffice-orders-state.service";

@Injectable()
export class OrdersApiService {

  constructor(private httpClient: HttpClient) {

  }

  public createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>("api/order", order);
  }

  public loadOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>("api/order");
  }

  public loadOrdersPaginated(pageIndex: number, pageSize: number): Observable<{ orders: Order[], totalCount: number }> {
    const _start = pageIndex * pageSize;
    const _end = _start + pageSize;

    return this.httpClient.get<Order[]>("api/order", {
      observe: "response", params: {
        "_start": _start,
        "_end": _end
      }
    }).pipe(
      map(response => {
        return {
          orders: response.body ? response.body : [],
          totalCount: response.headers.get("X-Total-Count") ? Number(response.headers.get("X-Total-Count")) : 0
        };
      })
    );
  }

  public loadOrderById(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(`api/order/${orderId}`);
  }


  public updateOrderStatus(order: Order, newOrderStatus: OrderStatus) {
    return this.httpClient.patch<Order>(`api/order/${order.id}`, { orderStatus: newOrderStatus });
  }
}

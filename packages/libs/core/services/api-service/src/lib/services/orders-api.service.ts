import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Order, OrderStatus } from "@ngrx-orders-workshop/libs/core/model";
import { Sort } from "@angular/material/sort";

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

  public loadOrdersPaginatedAndSorted(pageIndex: number, pageSize: number, sort: Sort): Observable<{ orders: Order[], totalCount: number }> {
    const _start = pageIndex * pageSize;
    const _end = _start + pageSize;
    const _sort = sort.active;
    const _order = sort.direction;
    let params: HttpParams = new HttpParams().append("_start", _start).append("_end", _end);
    if (sort.direction !== "" && sort.direction !== null) {
      params = params.append("_sort", _sort).append("_order", _order);
    }
    return this.httpClient.get<Order[]>("api/order", {
      observe: "response", params: params
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

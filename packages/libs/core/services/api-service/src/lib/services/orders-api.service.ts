import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order, ProductOrder } from "@ngrx-orders-workshop/libs/core/model";

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

  public loadOrderById(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(`api/order/${orderId}`);
  }


}

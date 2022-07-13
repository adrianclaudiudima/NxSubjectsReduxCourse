import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "@ngrx-orders-workshop/libs/core/model";

@Injectable()
export class ProductsApiService {

  constructor(private httpClient: HttpClient) {

  }

  public loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("api/product");
  }

}


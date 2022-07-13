import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategorySummary } from "@ngrx-orders-workshop/libs/core/components/category-cards";

@Injectable()
export class CategoriesApiService {

  constructor(private httpClient: HttpClient) {
  }

  public loadProductCategories(): Observable<CategorySummary[]> {
    return this.httpClient.get<CategorySummary[]>("/api/categories");
  }

}

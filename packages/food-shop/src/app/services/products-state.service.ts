import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, map, Observable, of, Subject, take, tap } from "rxjs";
import { DomainEntity, Product, ProductType } from "@ngrx-orders-workshop/libs/core/model";
import { CategoriesApiService, ProductsApiService } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { CategorySummary } from "@ngrx-orders-workshop/libs/core/components/category-cards";

export interface ProductsState {
  categories: DomainEntity<CategorySummary[]>;
  products: DomainEntity<Product[]>;
  filter: ProductType | undefined;
}

@Injectable()
export class ProductsStateService {

  private productsState: ProductsState = {
    filter: undefined,
    categories: {
      domain: [],
      requestStatus: {
        status: "NEW",
        error: undefined
      }
    },
    products: {
      domain: [],
      requestStatus: {
        status: "NEW",
        error: undefined
      }
    }
  };

  private productsStateSubject: Subject<ProductsState> = new BehaviorSubject(this.productsState);
  public productsState$: Observable<ProductsState> = this.productsStateSubject.asObservable().pipe(
    map(state => {
      return state.filter === undefined ? { ...state } :
        {
          ...state, products: {
            ...state.products, domain:
              state.products.domain.filter(v => v.productType === state.filter)
          }
        };
    })
  );

  constructor(private productsApiService: ProductsApiService, private categoriesApiService: CategoriesApiService) {
  }

  public loadAllProducts(): void {
    this.productsApiService.loadProducts().pipe(
      map<Product[], DomainEntity<Product[]>>(value => ({
        domain: value,
        requestStatus: { status: "COMPLETED", error: undefined }
      })),
      catchError(err => (of<DomainEntity<Product[]>>({
          domain: [],
          requestStatus: {
            status: "ERROR", error: {
              code: err.code,
              message: "Something went wrong."
            }
          }
        }))
      ),
      tap<DomainEntity<Product[]>>(v => this.updateProductsState(v)),
      take(1))
      .subscribe();
  }

  public loadAllCategories(): void {
    this.categoriesApiService.loadProductCategories().pipe(
      map<CategorySummary[], DomainEntity<CategorySummary[]>>(value => ({
        domain: value,
        requestStatus: { status: "COMPLETED", error: undefined }
      })),
      catchError(err => (of<DomainEntity<CategorySummary[]>>({
          domain: [],
          requestStatus: {
            status: "ERROR", error: {
              code: err.code,
              message: "Something went wrong."
            }
          }
        }))
      ),
      tap<DomainEntity<CategorySummary[]>>(v => this.updateCategoriesState(v)),
      take(1)
    )
      .subscribe();
  }


  private updateProductsState(state: DomainEntity<Product[]>): void {
    this.productsState = { ...this.productsState, products: state };
    this.productsStateSubject.next(this.productsState);
  }

  private updateCategoriesState(state: DomainEntity<CategorySummary[]>): void {
    this.productsState = { ...this.productsState, categories: state };
    this.productsStateSubject.next(this.productsState);
  }

  filterProducts(categorySummary: CategorySummary | undefined): void {
    this.productsState = {
      ...this.productsState, filter: categorySummary === undefined ? undefined : categorySummary.type
    };
    this.productsStateSubject.next(this.productsState);
  }
}


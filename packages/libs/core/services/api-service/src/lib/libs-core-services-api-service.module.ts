import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsApiService } from "./services/products-api.service";
import { HttpClientModule } from "@angular/common/http";
import { CategoriesApiService } from "./services/categories-api.service";
import { StateSerializerService } from "./services/state-serializer.service";
import { OrdersApiService } from "./services/orders-api.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProductsApiService,
    CategoriesApiService,
    StateSerializerService,
    OrdersApiService
  ]
})
export class LibsCoreServicesApiServiceModule {
}

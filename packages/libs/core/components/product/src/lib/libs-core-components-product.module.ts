import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { LibsCoreComponentsNumberInputCounterModule } from "@ngrx-orders-workshop/libs/core/components/number-input-counter";
import { LibsCoreComponentsRatingStarsModule } from "@ngrx-orders-workshop/libs/core/components/rating-stars";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    LibsCoreComponentsNumberInputCounterModule,
    LibsCoreComponentsRatingStarsModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    ProductListComponent,
    ProductDetailsComponent
  ]
})
export class LibsCoreComponentsProductModule {
}

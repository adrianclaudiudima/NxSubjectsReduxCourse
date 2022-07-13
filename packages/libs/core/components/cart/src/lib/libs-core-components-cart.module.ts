import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartWidgetComponent } from "./components/cart-widget/cart-widget.component";
import { CartListComponent } from "./components/cart-list/cart-list.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { OverlayModule } from "@angular/cdk/overlay";
import { MatBadgeModule } from "@angular/material/badge";
import { LibsCoreComponentsNumberInputCounterModule } from "@ngrx-orders-workshop/libs/core/components/number-input-counter";

@NgModule({
  declarations: [
    CartWidgetComponent,
    CartListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    OverlayModule,
    LibsCoreComponentsNumberInputCounterModule
  ],
  exports: [
    CartWidgetComponent,
    CartListComponent
  ]
})
export class LibsCoreComponentsCartModule {
}

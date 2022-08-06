import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderCardListComponent } from "./components/order-card-list/order-card-list.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { OrderStatusBarComponent } from "./components/order-status-bar/order-status-bar.component";

@NgModule({
  declarations: [
    OrderCardListComponent,
    OrderDetailsComponent,
    OrderStatusBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    OrderCardListComponent,
    OrderDetailsComponent,
    OrderStatusBarComponent
  ]
})
export class LibsCoreComponentsOrdersModule {
}

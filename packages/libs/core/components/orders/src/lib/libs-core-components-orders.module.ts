import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderCardListComponent } from "./components/order-card-list/order-card-list.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { OrderStatusBarComponent } from "./components/order-status-bar/order-status-bar.component";
import { OrderTableComponent } from "./components/order-table/order-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [
    OrderCardListComponent,
    OrderDetailsComponent,
    OrderStatusBarComponent,
    OrderTableComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    OrderCardListComponent,
    OrderDetailsComponent,
    OrderStatusBarComponent,
    OrderTableComponent
  ]
})
export class LibsCoreComponentsOrdersModule {
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { OverlayModule } from "@angular/cdk/overlay";
import { FavoriteListComponent } from "./components/favorite-list/favorite-list.component";
import { FavoriteWidgetComponent } from "./components/favorite-widget/favorite-widget.component";
import { MatBadgeModule } from "@angular/material/badge";
import { OrdersWidgetComponent } from "./components/orders-widget/orders-widget.component";

@NgModule({

  declarations: [
    FavoriteListComponent,
    FavoriteWidgetComponent,
    OrdersWidgetComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    OverlayModule
  ],
  exports: [FavoriteListComponent, FavoriteWidgetComponent, OrdersWidgetComponent]
})
export class LibsCoreComponentsFavoriteModule {
}

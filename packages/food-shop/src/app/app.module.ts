import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "@angular/cdk/layout";
import { DomPortalModule } from "@ngrx-orders-workshop/libs/core/components/dom-portal";
import { HttpClientModule } from "@angular/common/http";
import { OrdersTableComponent } from "./components/orders-table/orders-table.component";
import { LibsCoreComponentsStatsModule } from "@ngrx-orders-workshop/libs/core/components/stats";
import { LibsCoreComponentsProductModule } from "@ngrx-orders-workshop/libs/core/components/product";
import { LibsCoreComponentsNumberInputCounterModule } from "@ngrx-orders-workshop/libs/core/components/number-input-counter";
import { LibsCoreComponentsCategoryCardsModule } from "@ngrx-orders-workshop/libs/core/components/category-cards";
import { OverlayProductDetailsDialog, ShopComponent } from "./components/shop/shop.component";
import { AppRouting } from "./app.routing";
import { CartStateService } from "./services/cart-state.service";
import { FavoriteStateService } from "./services/favorite-state.service";
import { LibsCoreComponentsFavoriteModule } from "@ngrx-orders-workshop/libs/core/components/favorite";
import { LibsCoreComponentsCartModule } from "@ngrx-orders-workshop/libs/core/components/cart";
import { IconsRegistryModule, MaterialModule } from "@ngrx-orders-workshop/libs/core/theme";
import { ProductsStateService } from "./services/products-state.service";
import { LibsCoreServicesApiServiceModule } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { ShopWidgetsComponent } from "./components/shop-widgets/shop-widgets.component";
import { CheckoutPageComponent } from "./components/checkout-page/checkout-page.component";
import { LibsCoreComponentsCardSelectionModule } from "@ngrx-orders-workshop/libs/core/components/card-selection";
import { CheckoutStateService } from "./services/checkout-state.service";
import { OrdersStatusComponent } from "./components/orders-status/orders-status.component";
import { LibsCoreComponentsCheckoutModule } from "@ngrx-orders-workshop/libs/core/components/checkout";
import { LibsCoreComponentsOrdersModule } from "@ngrx-orders-workshop/libs/core/components/orders";
import { YourOrdersComponent } from "./components/your-orders/your-orders.component";
import { YourOrderDetailComponents } from "./components/your-order-detail/your-order-detail.components";

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    NxWelcomeComponent,
    OrdersTableComponent,
    OverlayProductDetailsDialog,
    ShopWidgetsComponent,
    CheckoutPageComponent,
    OrdersStatusComponent,
    YourOrdersComponent,
    YourOrderDetailComponents
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    ReactiveFormsModule,
    AppRouting,
    DomPortalModule,
    LibsCoreComponentsNumberInputCounterModule,
    IconsRegistryModule,
    HttpClientModule,
    LibsCoreComponentsStatsModule,
    LibsCoreComponentsProductModule,
    LibsCoreComponentsFavoriteModule,
    LibsCoreComponentsCartModule,
    LibsCoreComponentsCategoryCardsModule,
    LibsCoreServicesApiServiceModule,
    LibsCoreComponentsCardSelectionModule,
    LibsCoreComponentsCheckoutModule,
    LibsCoreComponentsOrdersModule
  ],
  providers: [
    CartStateService,
    FavoriteStateService,
    ProductsStateService,
    CheckoutStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

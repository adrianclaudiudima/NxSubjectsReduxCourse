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
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { LibsCoreComponentsCardSelectionModule } from "@ngrx-orders-workshop/libs/core/components/card-selection";
import { CheckoutStateService } from "./services/checkout-state.service";

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    NxWelcomeComponent,
    OrdersTableComponent,
    OverlayProductDetailsDialog,
    ShopWidgetsComponent,
    CheckoutComponent
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
    LibsCoreComponentsCardSelectionModule
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

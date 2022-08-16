import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { LibsCoreComponentsStatsModule } from "@ngrx-orders-workshop/libs/core/components/stats";
import { LibsCoreComponentsProductModule } from "@ngrx-orders-workshop/libs/core/components/product";
import { LibsCoreComponentsFavoriteModule } from "@ngrx-orders-workshop/libs/core/components/favorite";
import { LibsCoreComponentsCartModule } from "@ngrx-orders-workshop/libs/core/components/cart";
import { LibsCoreComponentsCategoryCardsModule } from "@ngrx-orders-workshop/libs/core/components/category-cards";
import { LibsCoreServicesApiServiceModule } from "@ngrx-orders-workshop/libs/core/services/api-service";
import { LibsCoreComponentsCardSelectionModule } from "@ngrx-orders-workshop/libs/core/components/card-selection";
import { LibsCoreComponentsCheckoutModule } from "@ngrx-orders-workshop/libs/core/components/checkout";
import { LibsCoreComponentsOrdersModule } from "@ngrx-orders-workshop/libs/core/components/orders";
import { DomPortalModule } from "@ngrx-orders-workshop/libs/core/components/dom-portal";
import { IconsRegistryModule, MaterialModule } from "@ngrx-orders-workshop/libs/core/theme";
import { HttpClientModule } from "@angular/common/http";
import { LibsCoreComponentsNumberInputCounterModule } from "@ngrx-orders-workshop/libs/core/components/number-input-counter";
import { AppRouting } from "./app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrdersPageComponent } from "./components/orders-page/orders-page.component";
import { BackofficeOrdersStateService } from "./services/backoffice-orders-state.service";
import { DashboardPageComponent } from "./components/dashboard-page/dashboard-page.component";

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    OrdersPageComponent,
    DashboardPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    DomPortalModule,
    IconsRegistryModule,
    MaterialModule,
    HttpClientModule,
    AppRouting,
    LibsCoreComponentsNumberInputCounterModule,
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
    BackofficeOrdersStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

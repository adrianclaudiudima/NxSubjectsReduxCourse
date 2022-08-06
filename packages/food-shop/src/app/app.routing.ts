import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from "./components/shop/shop.component";
import { CheckoutPageComponent } from "./components/checkout-page/checkout-page.component";
import { YourOrdersComponent } from "./components/your-orders/your-orders.component";
import { YourOrderDetailComponents } from "./components/your-order-detail/your-order-detail.components";


const routes: Routes = [
  {
    path: "",
    component: ShopComponent
  },
  {
    path: "checkout",
    component: CheckoutPageComponent
  }, {
    path: "orders",
    component: YourOrdersComponent
  }, {
    path: "orders/:id",
    component: YourOrderDetailComponents
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: "enabledBlocking"
  })],
  exports: [
    RouterModule
  ]
})
export class AppRouting {

}

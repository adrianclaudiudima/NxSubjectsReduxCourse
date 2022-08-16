import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardPageComponent } from "./components/dashboard-page/dashboard-page.component";
import { OrdersPageComponent } from "./components/orders-page/orders-page.component";


const routes: Routes = [
  {
    path: "",
    component: DashboardPageComponent,
    pathMatch: "full"
  },
  {
    path: "orders",
    component: OrdersPageComponent
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

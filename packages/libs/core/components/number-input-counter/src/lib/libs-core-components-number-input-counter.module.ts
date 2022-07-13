import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NumberInputCounterComponent } from "./components/number-input-counter.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    NumberInputCounterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NumberInputCounterComponent
  ]
})
export class LibsCoreComponentsNumberInputCounterModule {
}

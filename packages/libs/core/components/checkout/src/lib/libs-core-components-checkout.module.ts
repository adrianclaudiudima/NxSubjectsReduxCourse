import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./components/checkout.component";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { LibsCoreComponentsCardSelectionModule } from "@ngrx-orders-workshop/libs/core/components/card-selection";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LibsCoreComponentsCardSelectionModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [CheckoutComponent]
})
export class LibsCoreComponentsCheckoutModule {
}

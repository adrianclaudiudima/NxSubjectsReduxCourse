import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardSelectionComponent } from "./components/card-selection.component";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [CardSelectionComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule
  ],
  exports: [CardSelectionComponent]
})
export class LibsCoreComponentsCardSelectionModule {
}

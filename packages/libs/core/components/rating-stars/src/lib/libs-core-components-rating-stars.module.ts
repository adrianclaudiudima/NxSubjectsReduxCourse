import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RatingStarComponent } from "./componenets/rating-star.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [RatingStarComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  exports: [RatingStarComponent]
})
export class LibsCoreComponentsRatingStarsModule {
}

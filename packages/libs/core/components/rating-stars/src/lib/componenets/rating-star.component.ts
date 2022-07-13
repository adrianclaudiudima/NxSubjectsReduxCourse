import { Component, Input } from "@angular/core";

@Component({
  selector: "app-rating-star",
  templateUrl: "rating-star.component.html"
})
export class RatingStarComponent {

  @Input()
  ratingValue: number = 3.22;

  @Input()
  reviewsNumber: number = 1222;

}

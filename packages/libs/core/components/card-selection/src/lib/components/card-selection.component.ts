import { Component, EventEmitter, Input } from "@angular/core";
import { CardData } from "@ngrx-orders-workshop/libs/core/components/card-selection";
import { Output } from "@angular/core";


@Component({
  selector: "app-card-selection",
  templateUrl: "card-selection.component.html"
})
export class CardSelectionComponent {

  @Input()
  title!: string;

  @Input()
  cardData: CardData[] = [];

  @Output()
  cardDataChanged: EventEmitter<CardData[]> = new EventEmitter<CardData[]>();

  updateSelected(item: CardData) {
    this.cardData = this.cardData.map(cd => {
      return cd.name === item.name ? { ...cd, selected: true } : { ...cd, selected: false };
    });
    this.cardDataChanged.emit(this.cardData);
  }
}

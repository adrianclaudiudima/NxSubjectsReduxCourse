import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  selector: "app-number-counter",
  templateUrl: "number-input-counter.component.html"
})
export class NumberInputCounterComponent {

  @Input()
  counter = 0;

  @Input()
  minLimit = 0;

  @Output()
  counterChanged: EventEmitter<number> = new EventEmitter<number>();

  updateCounter(counter: number) {
    if (counter >= this.minLimit) {
      this.counter = counter;
      this.counterChanged.emit(this.counter);
    }
  }
}

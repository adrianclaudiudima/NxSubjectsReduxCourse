import {Component, Input} from "@angular/core";
import {StatsRow} from "@ngrx-orders-workshop/libs/core/components/stats";

@Component({
    selector: 'app-stats-v2',
    templateUrl: 'stats.component.html'
  }
)
export class StatsComponent {

  Math = Math;

  @Input()
  statsRows!: StatsRow[];

}

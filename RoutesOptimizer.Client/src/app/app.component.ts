import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DropdownSearchComponent } from './dropdown-search/dropdown-search.component';
import { Stop } from './models/stop.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, DropdownSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RoutesOptimizer.Client';
  fromStop: any;
  toStop: any;

  onFromSelect(stop: Stop) {
    this.fromStop = stop;

  }

  onToSelect(stop: Stop) {
    this.toStop = stop;
  }
}


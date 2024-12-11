import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RoutesOptimizer.Client';

  constructor(private service: AppService) {
    this.service.get().subscribe(data => {
      console.log(data);
    });
  }

}


import { Component } from '@angular/core';
import { UbikeDemoComponent } from "./ubike-demo/ubike-demo.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UbikeDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'd3js-demo';
}

import { Component } from '@angular/core';
import { BasicDemoComponent } from './basic-demo/basic-demo.component';
import { ConflictDemoComponent } from './conflict-demo/conflict-demo.component';
import { UbikeDemoComponent } from "./ubike-demo/ubike-demo.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BasicDemoComponent, ConflictDemoComponent, UbikeDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'd3js-demo';
}

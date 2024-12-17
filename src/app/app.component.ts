import { Component } from '@angular/core';
import { BasicDemoComponent } from './basic-demo/basic-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BasicDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'd3js-demo';
}

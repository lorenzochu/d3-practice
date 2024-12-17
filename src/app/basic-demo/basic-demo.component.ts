import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-basic-demo',
  standalone: true,
  imports: [],
  templateUrl: './basic-demo.component.html',
  styleUrl: './basic-demo.component.scss',
})
export class BasicDemoComponent {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.demo();
  }

  async demo() {
    const data = await d3.csv('../../assets/example.csv');
    console.log(data);
    console.log(d3.select(this.el.nativeElement));
    const svg = d3
      .select(this.el.nativeElement)
      .select('.chart')
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);
    console.log('svg:', svg);

    const xData = data.map((d) => {
      const year = d['發病年週'].substring(0, 4);
      const week = d['發病年週'].substring(4);
      return year === '2023' ? +week : +week + 52;
    });
    const yData = data.map((d) => d['確定病例數']);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(xData) as [number, number])
      .range([10, 490]);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(4)
      .tickFormat((d) => `${d}週`);
    const xGroup = svg.append('g').call(xAxis);
    // .attr('transform', `translate(0, ${500 - 20})`);
  }
}

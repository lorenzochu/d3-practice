import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-conflict-demo',
  standalone: true,
  imports: [],
  templateUrl: './conflict-demo.component.html',
  styleUrl: './conflict-demo.component.scss',
})
export class ConflictDemoComponent {
  constructor(private el: ElementRef) {}

  async ngOnInit() {
    const datas = await d3.json<Vertex[]>('../../assets/vertex.json');
    const svg = d3
      .select(this.el.nativeElement)
      .select('.conflict')
      .append('svg')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight);

    if (!datas) {
      return;
    }

    const data1Level1 = datas.filter(
      (d) => d.milepost <= 18000 && d.level === 1
    );
    const data1Level2 = datas.filter(
      (d) => d.milepost <= 18000 && d.level === 2
    );
    const data2 = datas.filter(
      (d) => d.milepost > 18000 && d.milepost <= 21200
    );
    const data3 = datas.filter((d) => d.milepost > 21200);
    console.log(data1Level1);
    console.log(data1Level2);
    console.log(data2);
    console.log(data3);

    const milepost1 = data1Level1.map((d) => d.milepost);
    const scale1 = d3.scaleLinear(
      [Math.min(...milepost1), Math.max(...milepost1)],
      [20, 500]
    );
    const scalePoint = d3.scalePoint(
      milepost1,
      [20, 500]
    )
    const milepost2 = data1Level2.map((d) => d.milepost);
    const scale2 = d3.scaleLinear(
      [Math.min(...milepost2), Math.max(...milepost2)],
      [20, 500]
    );

    svg
      .append('g')
      .selectAll('circle')
      .data(data1Level1)
      .enter()
      .append('circle')
      // .attr('cx', (d) => scale1(d.milepost))
      .attr('cx', (d) => scalePoint(d.milepost)!)
      .attr('cy', 100)
      .attr('r', 6)
      .attr('fill', 'grey')
      .attr('class', (d) => `dot-${d.id}`);

    svg
      .append('g')
      .selectAll('circle')
      .data(data1Level2)
      .enter()
      .append('circle')
      .attr('cx', (d) => scale2(d.milepost))
      .attr('cy', 220)
      .attr('r', 6)
      .attr('fill', 'blue')
      .attr('class', (d) => `dot-${d.id}`);

    const point1 = d3.select(this.el.nativeElement).select('.dot-3-1').node();
    const point2 = d3.select(this.el.nativeElement).select('.dot-3-6').node();
    const point3 = d3.select(this.el.nativeElement).select('.dot-3-12').node();
    console.log(point1);
    console.log(point2);

    svg
      .append('line')
      .attr('x1', (point1 as Element).getAttribute('cx'))
      .attr('y1', (point1 as Element).getAttribute('cy'))
      .attr('x2', (point2 as Element).getAttribute('cx'))
      .attr('y2', (point2 as Element).getAttribute('cy'))
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
    svg
      .append('line')
      .attr('x1', (point3 as Element).getAttribute('cx'))
      .attr('y1', (point3 as Element).getAttribute('cy'))
      .attr('x2', (point2 as Element).getAttribute('cx'))
      .attr('y2', (point2 as Element).getAttribute('cy'))
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
  }
}

type Vertex = {
  id: string;
  milepost: number;
  isYard: boolean;
  platformName: string;
  level: number;
};

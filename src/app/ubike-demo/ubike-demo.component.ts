import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-ubike-demo',
  standalone: true,
  imports: [],
  templateUrl: './ubike-demo.component.html',
  styleUrl: './ubike-demo.component.scss',
})
export class UbikeDemoComponent {
  constructor(private el: ElementRef) {}

  async ngOnInit(): Promise<void> {
    const datas = await d3.json<UbikeInfo[]>('../../assets/youbike.json');

    const svg = d3
      .select(this.el.nativeElement)
      .select('.container')
      .append('svg')
      .attr('width', 700)
      .attr('height', 500)
      .style('border', '1px solid black');

    if (!datas) return;

    const latitudeList = datas.map((d) => d.latitude);
    const longitudeList = datas.map((d) => d.longitude);
    const latitudeScale = d3
      .scaleLinear()
      .domain([Math.min(...latitudeList), Math.max(...latitudeList)])
      .range([480, 20]);
    const longitudeScale = d3
      .scaleLinear()
      .domain([Math.min(...longitudeList), Math.max(...longitudeList)])
      .range([20, 680]);

    const g = svg.append('g');
    const dots = g
      .selectAll('circle')
      .data(datas)
      .enter()
      .append('circle')
      .attr('cx', (d) => longitudeScale(d.longitude))
      .attr('cy', (d) => latitudeScale(d.latitude))
      .attr('r', 4)
      .style('fill', 'grey');

    // const tooltips = d3
    //   .select(this.el.nativeElement)
    //   .select('.container')
    const tooltips = g
      .append('div')
      .style('opacity', 0)
      .style('position', 'fixed')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px');

    dots
      .on('mouseover', () => {
        tooltips.style('opacity', 1);
      })
      .on('mousemove', (event) => {
        const pt = d3.pointer(event);
        const data: UbikeInfo = event.target.__data__;
        tooltips
          .style('opacity', 1)
          .style('left', pt[0] + 30 + 'px')
          .style('top', pt[1] + 'px').html(`
            <div>${data.sna}</div>
            <div>總車位：${data.total}</div>
            <div>剩餘車輛：${data.available_rent_bikes}</div>
          `);
      })
      .on('mouseleave', () => {
        tooltips.style('opacity', 0);
      });

    const zoom = d3
      .zoom()
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
        // tooltips.attr('transform', event.transform)
      });
    svg.call(zoom as any);
  }
}

type UbikeInfo = {
  sno: string;
  sna: string;
  sarea: string;
  mday: string;
  ar: string;
  sareaen: string;
  snaen: string;
  aren: string;
  act: string;
  srcUpdateTime: string;
  updateTime: string;
  infoTime: string;
  infoDate: string;
  total: number;
  available_rent_bikes: number;
  latitude: number;
  longitude: number;
  available_return_bikes: number;
};

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataPoint, RadialAreaChartProps } from '~/components/charts/RadialAreaChart/types';
import { generateSampleData } from '~/components/charts/RadialAreaChart/utils';


const RadialAreaChart: React.FC<RadialAreaChartProps> = ({
  width = 600,
  height = 600,
  data = generateSampleData()
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear existing content
    d3.select(svgRef.current).selectAll('*').remove();

    // Setup dimensions
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, 2 * Math.PI]);

    const y = d3.scaleRadial()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([0, radius]);

    // Area generator
    const area = d3.areaRadial<DataPoint>()
      .curve(d3.curveLinearClosed)
      .angle(d => x(d.date))
      .innerRadius(0)
      .outerRadius(d => y(d.value));

    // Add the area path with animation
    const path = svg.append('path')
      .datum(data)
      .attr('fill', '#69b3a2')
      .attr('fill-opacity', 0.5)
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('d', area);

    // Animation
    const totalLength = (path.node() as SVGPathElement).getTotalLength();

    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Add circles for data points with animation
    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => y(d.value) * Math.cos(x(d.date) - Math.PI / 2))
      .attr('cy', d => y(d.value) * Math.sin(x(d.date) - Math.PI / 2))
      .attr('r', 0)
      .attr('fill', '#69b3a2')
      .attr('stroke', '#000')
      .transition()
      .delay((_, i) => i * 50)
      .duration(500)
      .attr('r', 3);

    // Add radial grid lines
    const yAxis = svg.append('g');
    const yTicks = y.ticks(5);

    yAxis.selectAll('circle')
      .data(yTicks)
      .join('circle')
      .attr('fill', 'none')
      .attr('stroke', '#ddd')
      .attr('r', y)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    // Add value labels
    yAxis.selectAll('text')
      .data(yTicks)
      .join('text')
      .attr('y', d => -y(d))
      .attr('dy', '0.35em')
      .attr('fill', '#666')
      .attr('opacity', 0)
      .text(d => d.toString())
      .transition()
      .duration(1000)
      .attr('opacity', 1);

  }, [data, width, height]);

  return (
    <div className="radial-area-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};


export default RadialAreaChart;
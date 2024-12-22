import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { DataPoint } from './types';
import { data } from './mock-data';
import useInterval from '../../../hooks/useInterval';

export default function BarChart() {
    const [dataset, setDataset] = useState<DataPoint[]>(data);
    const svgRef = useRef<SVGSVGElement>(null);
    useInterval(() => {
        setDataset(data);
    }, 2000);

    useEffect(() => {
        console.info('BarChart::useEffect:: STEP 1');

        if (!svgRef.current) return;

        console.info('BarChart::useEffect:: STEP 2');

        // Clear any existing content
        d3.select(svgRef.current).selectAll('*').remove();

        // Set dimensions
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Create SVG container
        const svg = d3
            .select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Create scales
        const x = d3.scaleBand().range([0, width]).padding(0.1);

        const y = d3.scaleLinear().range([height, 0]);

        // Set domains
        x.domain(data.map(d => d.month));
        y.domain([0, d3.max(data, d => d.value) || 0]);

        // Add X axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .attr('class', 'text-sm')
            .call(d3.axisBottom(x));

        // Add Y axis
        svg.append('g').attr('class', 'text-sm').call(d3.axisLeft(y));

        // Add bars with animation
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'fill-blue-500')
            .attr('x', d => x(d.month) || 0)
            .attr('width', x.bandwidth())
            .attr('y', height)
            .attr('height', 0)
            .transition()
            .duration(800)
            .delay((_, i) => i * 100)
            .attr('y', d => y(d.value))
            .attr('height', d => height - y(d.value));

        // Add value labels with animation
        svg.selectAll('.label')
            .data(dataset)
            .enter()
            .append('text')
            .attr('class', 'text-sm fill-gray-600')
            .attr('text-anchor', 'middle')
            .attr('x', d => (x(d.month) || 0) + x.bandwidth() / 2)
            .attr('y', height)
            .text(d => d.value)
            .transition()
            .duration(800)
            .delay((_, i) => i * 100)
            .attr('y', d => y(d.value) - 5);
    }, [dataset]);

    console.info('====> BarChart');

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
                Monthly Sales Performance
            </h2>
            <svg ref={svgRef} className="w-full" />
        </div>
    );
}

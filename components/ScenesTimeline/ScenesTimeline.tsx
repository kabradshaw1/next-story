'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { type ScenesQuery } from '@/generated/graphql';

const ScenesTimeline: React.FC<ScenesQuery> = ({ scenes }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !scenes) return;

    const width = 700;
    const barHeight = 30; // Height of each bar including margin
    const height = scenes.length * barHeight;
    const margin = { top: 20, right: 120, bottom: 30, left: 120 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const startDate = d3.min(scenes, (d) => d.startTimeline) as number;
    const endDate = d3.max(scenes, (d) => d.endTimeline) as number;

    const x = d3
      .scaleLinear()
      .domain([startDate, endDate])
      .range([0, width * 0.8]); // Adjust the range to include 20% margin

    const y = d3
      .scaleBand()
      .domain(scenes.map((d) => d.title))
      .range([0, height])
      .padding(0.1);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Removed y-axis labels

    svg
      .selectAll('.bar')
      .data(scenes)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.startTimeline))
      .attr('y', (d) => y(d.title) as number)
      .attr('width', (d) => x(d.endTimeline) - x(d.startTimeline))
      .attr('height', y.bandwidth())
      .attr('fill', 'steelblue');

    svg
      .selectAll('.label')
      .data(scenes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (x(d.startTimeline) + x(d.endTimeline)) / 2) // Centered text
      .attr('y', (d) => (y(d.title) as number) + y.bandwidth() / 2 + 5)
      .attr('text-anchor', 'middle') // Center the text anchor
      .text((d) => d.title)
      .attr('fill', 'white');
  }, [scenes]);

  return (
    <div className="overflow-x-auto overflow-y-hidden w-full max-w-full">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ScenesTimeline;

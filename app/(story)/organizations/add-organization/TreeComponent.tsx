'use client';
/* eslint-disable @typescript-eslint/indent */
import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';

import * as d3 from 'd3';

import { convertToHierarchy } from '@/lib/orgHelper';
import { useAppSelector } from '@/lib/store/store';

import RoleForm, { type RoleInput } from './RoleForm';

const TreeComponent = (): JSX.Element => {
  const { roles } = useAppSelector((state) => state.roles);
  const [selectedNode, setSelectedNode] =
    useState<d3.HierarchyPointNode<RoleInput> | null>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = useCallback(
    (d: d3.HierarchyPointNode<RoleInput>): void => {
      setSelectedNode(d);
      console.log(d.data); // Print the role data associated with the node
    },
    []
  );

  const renderTree = useCallback(
    (roles: RoleInput[]): void => {
      d3.select('#tree').select('svg').remove();

      const width = 1200;
      const margin = { top: 20, right: 20, bottom: 20, left: 60 };
      const dx = 20;
      const dy = width / 6;

      const root = d3.hierarchy(convertToHierarchy(roles));
      root.x0 = 0;
      root.y0 = 0;

      const tree = d3.tree<RoleInput>().nodeSize([dx, dy]);
      const diagonal = d3
        .linkHorizontal<
          d3.HierarchyPointLink<RoleInput>,
          d3.HierarchyPointNode<RoleInput>
        >()
        .x((d) => d.y)
        .y((d) => d.x);

      const svg = d3
        .create('svg')
        .attr('width', width)
        .attr('viewBox', [-margin.left, -margin.top, width, 0])
        .attr(
          'style',
          'max-width: 100%; height: auto; font: 1em sans-serif; user-select: none;'
        );

      const gLink = svg
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5);

      const gNode = svg
        .append('g')
        .attr('cursor', 'pointer')
        .attr('pointer-events', 'all');

      const update = (source: d3.HierarchyPointNode<RoleInput>): void => {
        const nodes = root.descendants().reverse();
        const links = root.links();

        tree(root);

        let left = root;
        let right = root;
        let bottom = root;
        root.eachBefore((node) => {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
          if (node.depth > bottom.depth) bottom = node;
        });

        const heightValue = right.x - left.x + margin.top + margin.bottom;

        svg
          .attr('height', heightValue)
          .attr(
            'viewBox',
            [-margin.left, left.x - margin.top, width, heightValue].join(' ')
          );

        const node = gNode
          .selectAll<SVGGElement, d3.HierarchyPointNode<RoleInput>>('g')
          .data(nodes, (d) => d.id as string | number);

        const nodeEnter = node
          .enter()
          .append('g')
          .attr('transform', () => `translate(${source.y0},${source.x0})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .on('click', (event, d) => {
            handleNodeClick(d);
            update(d); // Update the node color immediately
          });

        nodeEnter
          .append('circle')
          .attr('r', 5)
          .attr('fill', (d) => (d._children ? '#555' : '#999'))
          .attr('stroke-width', 10);

        nodeEnter
          .append('text')
          .attr('dy', '0.31em')
          .attr('x', (d) => (d._children ? -10 : 10))
          .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
          .text((d) => d.data.title)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 3)
          .attr('stroke', 'white')
          .attr('paint-order', 'stroke');

        const nodeUpdate = node
          .merge(nodeEnter)
          .attr('transform', (d) => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1);

        nodeUpdate
          .select('circle')
          .attr('fill', (d) =>
            d === selectedNode ? 'red' : d._children ? '#555' : '#999'
          );

        nodeUpdate
          .select('text')
          .attr('fill', (d) => (d === selectedNode ? 'red' : 'black'));

        const nodeExit = node
          .exit()
          .remove()
          .attr('transform', (d) => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0);

        const link = gLink
          .selectAll<SVGPathElement, d3.HierarchyPointLink<RoleInput>>('path')
          .data(links, (d) => d.target.id as string | number);

        const linkEnter = link
          .enter()
          .append('path')
          .attr('d', () => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
          });

        link.merge(linkEnter).attr('d', diagonal);

        link
          .exit()
          .remove()
          .attr('d', () => {
            const o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
          });

        root.eachBefore((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        if (treeContainerRef.current) {
          treeContainerRef.current.style.height = `${heightValue}px`;
        }
      };

      update(root);

      document.getElementById('tree')?.appendChild(svg.node());
    },
    [selectedNode, handleNodeClick]
  );

  useLayoutEffect(() => {
    if (roles.length > 0) {
      renderTree(roles);
    }
  }, [roles, renderTree]);

  return (
    <div className="flex flex-col">
      <div id="tree" ref={treeContainerRef} className="w-full" />
      <RoleForm />
    </div>
  );
};

export default TreeComponent;

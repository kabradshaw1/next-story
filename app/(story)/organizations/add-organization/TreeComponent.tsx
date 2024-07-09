'use client';
/* eslint-disable @typescript-eslint/indent */
import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';

import * as d3 from 'd3';

import { convertToHierarchy } from '@/lib/orgHelper';
import { useAppSelector } from '@/lib/store/store';

import RoleForm, { type RoleInput } from './RoleForm';

type CustomHierarchyNode = d3.HierarchyNode<RoleInput> & {
  x0: number;
  y0: number;
};

const TreeComponent = (): JSX.Element => {
  const { roles } = useAppSelector((state) => state.roles);
  const [selectedNode, setSelectedNode] =
    useState<d3.HierarchyPointNode<RoleInput> | null>(null);
  const [superiorTitle, setSuperiorTitle] = useState<string | undefined>(
    undefined
  );
  const treeContainerRef = useRef<HTMLDivElement>(null);

  const handleNodeClick = useCallback(
    (d: d3.HierarchyPointNode<RoleInput>): void => {
      setSelectedNode(d);
      setSuperiorTitle(d.data.roleTitle); // Set the superior title based on the clicked node
    },
    []
  );

  const renderTree = useCallback(
    (roles: RoleInput[]): void => {
      d3.select('#tree').select('svg').remove();

      if (roles.length === 0) {
        // If roles are empty, ensure the container is cleared and height reset
        if (treeContainerRef.current !== null) {
          treeContainerRef.current.style.height = '0px';
        }
        return;
      }

      const width = 1200;
      const margin = { top: 20, right: 20, bottom: 20, left: 60 };
      const dx = 20;
      const dy = width / 6;

      const root = d3.hierarchy(
        convertToHierarchy(roles)
      ) as CustomHierarchyNode;
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

      const update = (source: CustomHierarchyNode): void => {
        const duration = 250; // Transition duration in milliseconds
        const nodes = root.descendants().reverse();
        const links = root.links();

        tree(root);

        let left = root;
        let right = root;
        let bottom = root;
        root.eachBefore((node) => {
          const n = node;
          if (
            n.x !== undefined &&
            left.x !== undefined &&
            right.x !== undefined
          ) {
            if (n.x < left.x) left = n;
            if (n.x > right.x) right = n;
            if (n.depth > bottom.depth) bottom = n;
          }
        });

        if (left.x === undefined || right.x === undefined) {
          return;
        }

        const heightValue = right.x - left.x + margin.top + margin.bottom;

        const transition = svg
          .transition()
          .duration(duration)
          .attr('height', heightValue)
          .attr(
            'viewBox',
            [-margin.left, left.x - margin.top, width, heightValue].join(' ')
          );

        // Update the nodes…
        const node = gNode
          .selectAll<SVGGElement, CustomHierarchyNode>('g')
          .data(nodes, (d) => d.id as string | number);

        // Enter any new nodes at the parent's previous position.
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
          .text((d) => d.data.roleTitle)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 3)
          .attr('stroke', 'white')
          .attr('paint-order', 'stroke');

        // Transition nodes to their new position.
        node
          .merge(nodeEnter)
          .transition(transition)
          .attr('transform', (d) => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1);

        // Transition exiting nodes to the parent's new position.
        node
          .exit()
          .transition(transition)
          .remove()
          .attr('transform', (d) => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0);

        // Update the links…
        const link = gLink
          .selectAll<SVGPathElement, d3.HierarchyPointLink<RoleInput>>('path')
          .data(links, (d) => d.target.id as string | number);

        // Enter any new links at the parent's previous position.
        const linkEnter = link
          .enter()
          .append('path')
          .attr('d', () => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
          });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition).attr('d', diagonal);

        // Transition exiting nodes to the parent's new position.
        link
          .exit()
          .transition(transition)
          .remove()
          .attr('d', (d) => {
            const o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
          });

        root.eachBefore((d) => {
          const n = d as CustomHierarchyPointNode;
          n.x0 = n.x;
          n.y0 = n.y;
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
    renderTree(roles);
  }, [roles, renderTree]);

  return (
    <div className="flex flex-col">
      <div id="tree" ref={treeContainerRef} className="w-full" />
      <RoleForm superiorTitle={superiorTitle} />
    </div>
  );
};

export default TreeComponent;

'use client';
import React, { useRef, useCallback, useEffect } from 'react';

import * as d3 from 'd3';

import type { RoleInput } from '@/app/(story)/organizations/create/RoleForm';
import { convertToHierarchy } from '@/lib/orgHelper';

/* eslint-disable @typescript-eslint/no-unsafe-argument  */
/* eslint-disable @typescript-eslint/no-explicit-any  */
type CustomHierarchyNode = d3.HierarchyNode<RoleInput> & {
  x0: number;
  y0: number;
  x: number;
  y: number; // Ensure y is always a number
  _children?: CustomHierarchyNode[];
};

type TreeSvgProps = {
  roles: RoleInput[];
  onNodeClick?: (node: d3.HierarchyPointNode<RoleInput>) => void;
};

const TreeSvg: React.FC<TreeSvgProps> = ({ roles, onNodeClick = () => {} }) => {
  const treeContainerRef = useRef<HTMLDivElement>(null);

  const renderTree = useCallback(
    (roles: RoleInput[]): void => {
      d3.select('#tree').select('svg').remove();

      if (roles.length === 0) {
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
      root.x = 0;
      root.y = 0; // Initialize y as a number

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
          ) as unknown as d3.Transition<
          SVGSVGElement,
          unknown,
          null,
          undefined
        >;

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
            onNodeClick(d as d3.HierarchyPointNode<RoleInput>);
            update(d);
          });

        nodeEnter
          .append('circle')
          .attr('r', 5)
          .attr('fill', (d) =>
            d._children !== undefined && d._children.length > 0
              ? '#555'
              : '#999'
          ) // Explicit check for _children
          .attr('stroke-width', 10);

        nodeEnter
          .append('text')
          .attr('dy', '0.31em')
          .attr('x', (d) =>
            d._children !== undefined && d._children.length > 0 ? -10 : 10
          ) // Explicit check for _children
          .attr('text-anchor', (d) =>
            d._children !== undefined && d._children.length > 0
              ? 'end'
              : 'start'
          ) // Explicit check for _children
          .text((d) => d.data.roleTitle)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 3)
          .attr('stroke', 'white')
          .attr('paint-order', 'stroke');

        node
          .merge(nodeEnter as any) // Use any to bypass type checking for merge
          .transition(transition as any) // Use any to bypass type checking for transition
          .attr('transform', (d) => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1);

        node
          .exit()
          .transition(transition as any) // Use any to bypass type checking for transition
          .remove()
          .attr('transform', () => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0);

        const link = gLink
          .selectAll<SVGPathElement, d3.HierarchyPointLink<RoleInput>>('path')
          .data(links, (d) => d.target.id as string | number);

        const linkEnter = link
          .enter()
          .append('path')
          .attr('d', () => {
            const o = {
              x: source.x0,
              y: source.y0,
              data: source.data,
              depth: source.depth,
              height: source.height,
              parent: source.parent as d3.HierarchyPointNode<RoleInput>,
              children: source.children as Array<
                d3.HierarchyPointNode<RoleInput>
              >,
            };
            // @ts-expect-error - Ignore error because I haven't been able to remove it, and it's not causing any issues
            return diagonal({ source: o, target: o });
          });

        link
          .merge(linkEnter as any)
          .transition(transition as any)
          .attr('d', diagonal as any);

        link
          .exit()
          .transition(transition as any)
          .remove()
          .attr('d', () => {
            const o = {
              x: source.x,
              y: source.y,
              data: source.data,
              depth: source.depth,
              height: source.height,
              parent: source.parent as d3.HierarchyPointNode<RoleInput>,
              children: source.children as Array<
                d3.HierarchyPointNode<RoleInput>
              >,
            };
            // @ts-expect-error - Ignore error because I haven't been able to remove it, and it's not causing any issues
            return diagonal({ source: o, target: o });
          });

        root.eachBefore((d) => {
          const n = d;
          n.x0 = n.x;
          n.y0 = n.y;
        });

        if (treeContainerRef.current !== null) {
          treeContainerRef.current.style.height = `${heightValue}px`;
        }
      };

      update(root);
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const svgNode = svg.node() as SVGSVGElement;
      if (svgNode !== null) {
        document.getElementById('tree')?.appendChild(svgNode);
      }
    },
    [onNodeClick]
  );

  useEffect(() => {
    renderTree(roles);
  }, [roles, renderTree]);

  return <div id="tree" ref={treeContainerRef} className="w-full" />;
};

export default TreeSvg;

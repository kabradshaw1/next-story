import React, { useState, useEffect } from 'react';

import * as d3 from 'd3';

import { useAppSelector } from '@/lib/store/store';

import { type RoleInput } from './OrganizationForm';
import RoleForm from './RoleForm';

const TreeComponent = (): JSX.Element => {
  const data = useAppSelector((state) => state.roles.roles);

  const [showForm, setShowForm] = useState(false);
  const [selectedNode, setSelectedNode] = useState<RoleInput | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      renderTree(data);
    }
  }, [data]);

  const handleAddNode = (node: RoleInput): void => {
    setSelectedNode(node);
    setShowForm(true);
  };

  const convertToHierarchy = (
    node: RoleInput,
    allNodes: RoleInput[]
  ): RoleInput & { children?: RoleInput[] } => {
    const subordinates = node.subordinatesTitles
      ?.map((title) => {
        const foundNode = allNodes.find((item) => item.title === title);
        return foundNode ? convertToHierarchy(foundNode, allNodes) : null;
      })
      .filter((item) => item !== null) as RoleInput[];
    return { ...node, children: subordinates };
  };

  const renderTree = (data: RoleInput[]): void => {
    d3.select('#tree').select('svg').remove();

    const width = 1200;
    const height = 800;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 60;
    const dx = 20;

    const root = d3.hierarchy(
      convertToHierarchy(data[0], data),
      (d) => d.children
    );

    const dy = (width - marginRight - marginLeft) / (1 + root.height);

    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3
      .linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    tree(root);

    const svg = d3
      .create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-marginLeft, -marginTop, width, height])
      .attr(
        'style',
        'max-width: 100%; height: auto; font: 12px sans-serif; user-select: none;'
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

    const update = (source: any) => {
      const nodes = root.descendants().reverse();
      const links = root.links();

      tree(root);

      let left = root;
      let right = root;
      root.eachBefore((node: any) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + marginTop + marginBottom;

      const transition = svg
        .transition()
        .duration(250)
        .attr('height', height)
        .attr('viewBox', [-marginLeft, left.x - marginTop, width, height]);

      const node = gNode.selectAll('g').data(nodes, (d: any) => d.id);

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('transform', (d: any) => `translate(${source.y0},${source.x0})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .on('click', (event, d) => {
          d.children = d.children ? null : d._children;
          update(d);
        });

      nodeEnter
        .append('circle')
        .attr('r', 5)
        .attr('fill', (d: any) => (d._children ? '#555' : '#999'))
        .attr('stroke-width', 10);

      nodeEnter
        .append('text')
        .attr('dy', '0.31em')
        .attr('x', (d: any) => (d._children ? -10 : 10))
        .attr('text-anchor', (d: any) => (d._children ? 'end' : 'start'))
        .text((d: any) => d.data.title)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .attr('stroke', 'white')
        .attr('paint-order', 'stroke');

      nodeEnter
        .append('text')
        .attr('dy', '1.31em')
        .attr('x', (d: any) => (d._children ? -10 : 10))
        .attr('text-anchor', (d: any) => (d._children ? 'end' : 'start'))
        .text('+')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .attr('stroke', 'white')
        .attr('paint-order', 'stroke')
        .on('click', (event, d) => {
          event.stopPropagation();
          handleAddNode(d.data);
        });

      const nodeUpdate = node
        .merge(nodeEnter)
        .transition(transition)
        .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1);

      const nodeExit = node
        .exit()
        .transition(transition)
        .remove()
        .attr('transform', (d: any) => `translate(${source.y},${source.x})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0);

      const link = gLink.selectAll('path').data(links, (d: any) => d.target.id);

      const linkEnter = link
        .enter()
        .append('path')
        .attr('d', (d: any) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      link.merge(linkEnter).transition(transition).attr('d', diagonal);

      link
        .exit()
        .transition(transition)
        .remove()
        .attr('d', (d: any) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });

      root.eachBefore((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d: any, i: number) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.title.length !== 7) d.children = null;
    });

    update(root);

    document.getElementById('tree')?.appendChild(svg.node());
  };

  return (
    <div>
      <div id="tree" />
      {showForm && selectedNode && (
        <RoleForm superiorTitle={selectedNode.title} />
      )}
    </div>
  );
};

export default TreeComponent;

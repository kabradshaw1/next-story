import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

type NodeData = {
  title: string;
  subordinates: string[] | null;
  superior: string | null;
  text: string | null;
};

type Data = NodeData[];

const TreeComponent = (): JSX.Element => {
  const [data, setData] = useState<Data>([
    { title: 'Create A Role', subordinates: null, superior: null, text: null },
  ]);
  const [newNodeName, setNewNodeName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  useEffect(() => {
    renderTree(data);
  }, [data]);

  const handleAddNode = (node: NodeData) => {
    setSelectedNode(node);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNodeName.trim()) {
      const newNode: NodeData = {
        title: newNodeName,
        subordinates: null,
        superior: selectedNode?.title || null,
        text: null,
      };
      const updatedData = [...data];
      if (selectedNode) {
        if (!selectedNode.subordinates) {
          selectedNode.subordinates = [];
        }
        selectedNode.subordinates.push(newNode.title);
      } else {
        updatedData.push(newNode);
      }
      updatedData.push(newNode);
      setData(updatedData);
      setNewNodeName('');
      setShowForm(false);
      setSelectedNode(null);
    }
  };

  const renderTree = (data: Data) => {
    d3.select('#tree').select('svg').remove();

    const width = 1200;
    const height = 800;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 60;
    const dx = 20;
    const dy =
      (width - marginRight - marginLeft) /
      (1 + d3.hierarchy(data[0], (d) => d.subordinates).height);

    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3
      .linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    const root = d3.hierarchy(data[0], (d) => d.subordinates);

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

    document.getElementById('tree').appendChild(svg.node());
  };

  return (
    <div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            placeholder="Enter role name"
          />
          <button type="submit">Add Role</button>
        </form>
      )}
      <div id="tree"></div>
    </div>
  );
};

export default TreeComponent;

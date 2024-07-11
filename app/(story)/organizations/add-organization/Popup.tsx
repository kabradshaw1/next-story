'use client';
import React, { useState, useCallback } from 'react';

import TreeSvg from '@/components/TreeSVG/TreeSVG';
import { useAppSelector } from '@/lib/store/store';

import RoleForm, { type RoleInput } from './RoleForm';

const Popup = (): JSX.Element => {
  const { roles } = useAppSelector((state) => state.roles);
  const [superiorTitle, setSuperiorTitle] = useState<string | undefined>(
    undefined
  );

  const handleNodeClick = useCallback(
    (d: d3.HierarchyPointNode<RoleInput>): void => {
      setSuperiorTitle(d.data.roleTitle); // Set the superior title based on the clicked node
    },
    []
  );

  return (
    <div className="flex flex-col">
      <TreeSvg roles={roles} onNodeClick={handleNodeClick} />
      <RoleForm superiorTitle={superiorTitle} />
    </div>
  );
};

export default Popup;

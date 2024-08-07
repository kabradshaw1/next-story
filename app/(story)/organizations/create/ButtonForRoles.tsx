'use client';
import React, { useState, useCallback } from 'react';

import ButtonAndPopup from '@/components/ButtonAndPopup/ButtonAndPopup';
import TreeSvg from '@/components/TreeSVG/TreeSVG';
import { useAppSelector } from '@/lib/store/store';

import RoleForm, { type RoleInput } from './RoleForm';

export default function ButtonForRoles(): JSX.Element {
  const [superiorTitle, setSuperiorTitle] = useState<string | undefined>(
    undefined
  );
  const { roles } = useAppSelector((state) => state.roles);
  const handleNodeClick = useCallback(
    (d: d3.HierarchyPointNode<RoleInput>): void => {
      setSuperiorTitle(d.data.roleTitle); // Set the superior title based on the clicked node
    },
    []
  );

  return (
    <ButtonAndPopup {...roles} buttonLabel="Roles">
      <TreeSvg roles={roles} onNodeClick={handleNodeClick} />
      <RoleForm superiorTitle={superiorTitle} />
    </ButtonAndPopup>
  );
}

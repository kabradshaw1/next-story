'use client';
import React, { useState, useCallback } from 'react';

import ButtonAndPopup from '@/components/ButtonAndPopup/ButtonAndPopup';

import RoleForm, { type RoleInput } from './RoleForm';

export default function ButtonForRoles(): JSX.Element {
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
    <ButtonAndPopup handleNodeClick={handleNodeClick}>
      <RoleForm superiorTitle={superiorTitle} />
    </ButtonAndPopup>
  );
}

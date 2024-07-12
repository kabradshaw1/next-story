'use client';
import React, { useState, useEffect, type ReactNode } from 'react';

import { type RoleInput } from '@/app/(story)/organizations/create/RoleForm';
import TreeSvg from '@/components/TreeSVG/TreeSVG';
import { useAppSelector } from '@/lib/store/store';

type ButtonAndPopupProps = {
  children?: ReactNode;
  handleNodeClick: (d: d3.HierarchyPointNode<RoleInput>) => void;
};

export default function ButtonAndPopup({
  children,
  handleNodeClick,
}: ButtonAndPopupProps): JSX.Element {
  const [showOverlay, setShowOverlay] = useState(false);
  const { roles } = useAppSelector((state) => state.roles);

  const toggleOverlay = (): void => {
    setShowOverlay(!showOverlay);
  };

  useEffect(() => {
    if (showOverlay) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    }
  }, [showOverlay]);

  return (
    <div>
      <button
        type="button"
        className="btn glow-on-hover"
        onClick={toggleOverlay}
      >
        Roles
      </button>
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white p-5 rounded w-11/12 h-5/6 overflow-auto">
            <button
              type="button"
              className="absolute top-2 right-2 btn glow-on-hover"
              onClick={toggleOverlay}
            >
              Done
            </button>
            <div className="flex flex-col">
              <TreeSvg roles={roles} onNodeClick={handleNodeClick} />
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

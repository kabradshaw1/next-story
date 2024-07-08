'use client';
import React, { useState, useEffect } from 'react';

import TreeComponent from './TreeComponent';

export default function ButtonForRoles(): JSX.Element {
  const [showOverlay, setShowOverlay] = useState(false);

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
      <button className="btn glow-on-hover" onClick={toggleOverlay}>
        Roles
      </button>
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white p-5 rounded w-11/12 h-5/6 overflow-auto">
            <button
              className="absolute top-2 right-2 btn glow-on-hover"
              onClick={toggleOverlay}
            >
              Done
            </button>
            <TreeComponent />
          </div>
        </div>
      )}
    </div>
  );
}

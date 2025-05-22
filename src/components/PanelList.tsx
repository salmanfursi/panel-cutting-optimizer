import React from 'react';
import type { Panel } from '../types';
// import { Panel } from '../types';

interface PanelListProps {
  panels: Panel[];
  handleRemovePanel: (id: string) => void;
}

const PanelList: React.FC<PanelListProps> = ({ panels, handleRemovePanel }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="font-bold mb-2">📋 Panel List</h2>
      {panels.length === 0 ? (
        <p className="text-gray-500">No panels</p>
      ) : (
        <ul>
          {panels.map((p) => (
            <li key={p.id} className="flex justify-between border-b py-1">
              <span>
                {p.qty}x {p.name} ({p.w}" x {p.h}")
              </span>
              <button
                className="text-red-500"
                onClick={() => handleRemovePanel(p.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelList;
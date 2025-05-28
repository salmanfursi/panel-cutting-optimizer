import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Panel } from "src/types/types";
 
interface PanelListProps {
  panels: Panel[];
  onAddPanel: () => void;
  onUpdatePanel: (id: string, updates: Partial<Panel>) => void;
  onRemovePanel: (id: string) => void;
}

export const PanelList: React.FC<PanelListProps> = ({
  panels,
  onAddPanel,
  onUpdatePanel,
  onRemovePanel,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Panels ({panels.length})
        </h3>
        <button
          onClick={onAddPanel}
          className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Panel
        </button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className="bg-white rounded-md p-3 border border-gray-200"
          >
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <label className="block text-xs font-medium text-gray-600">
                  Length
                </label>
                <input
                  type="number"
                  value={panel.length}
                  onChange={(e) =>
                    onUpdatePanel(panel.id, {
                      length: Number(e.target.value),
                    })
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">
                  Width
                </label>
                <input
                  type="number"
                  value={panel.width}
                  onChange={(e) =>
                    onUpdatePanel(panel.id, {
                      width: Number(e.target.value),
                    })
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">
                  Qty
                </label>
                <input
                  type="number"
                  min="1"
                  value={panel.quantity}
                  onChange={(e) =>
                    onUpdatePanel(panel.id, {
                      quantity: Number(e.target.value),
                    })
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={panel.label}
                onChange={(e) =>
                  onUpdatePanel(panel.id, { label: e.target.value })
                }
                placeholder="Panel label"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
              />
              <button
                onClick={() => onRemovePanel(panel.id)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {panels.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No panels added yet.</p>
            <p className="text-sm">Click "Add Panel" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React from "react";
import type { StockSheet } from "src/types/types";
 
interface StockSheetFormProps {
  stockSheet: StockSheet;
  onUpdate: (updates: Partial<StockSheet>) => void;
}

export const StockSheetForm: React.FC<StockSheetFormProps> = ({
  stockSheet,
  onUpdate,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Stock Sheet</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Length
          </label>
          <input
            type="number"
            value={stockSheet.length}
            onChange={(e) => onUpdate({ length: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <input
            type="number"
            value={stockSheet.width}
            onChange={(e) => onUpdate({ width: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material
          </label>
          <input
            type="text"
            value={stockSheet.material}
            onChange={(e) => onUpdate({ material: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={stockSheet.cost || 0}
            onChange={(e) => onUpdate({ cost: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

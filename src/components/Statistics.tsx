import React from "react";

interface StatisticsProps {
  stats: {
    efficiency: number;
    strategy: string;
    placedPanels: number;
    reusableWaste: number;
    wasteValue: number;
    totalPanels: number;
    materialCost: number;
    largestWaste: {
      width: number;
      height: number;
      area: number;
    };
  };
}

export const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Optimization Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {stats.efficiency.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Efficiency</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.placedPanels}
          </div>
          <div className="text-sm text-gray-600">Panels Placed</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {stats.reusableWaste}
          </div>
          <div className="text-sm text-gray-600">Reusable Waste</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">
            ${stats.wasteValue.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Waste Value</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Panels:</span>
            <span className="font-semibold">{stats.totalPanels}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Optimization Strategy:</span>
            <span className="font-semibold">{stats.strategy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Material Cost:</span>
            <span className="font-semibold">
              ${stats.materialCost.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Largest Waste Zone:</span>
            <span className="font-semibold">
              {stats.largestWaste.width.toFixed(1)}" ×{" "}
              {stats.largestWaste.height.toFixed(1)}"
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Waste Area:</span>
            <span className="font-semibold">
              {stats.largestWaste.area.toFixed(1)} sq in
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Savings:</span>
            <span className="font-semibold text-green-600">
              $
              {(
                stats.materialCost * (stats.efficiency / 100) -
                stats.materialCost * 0.75
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

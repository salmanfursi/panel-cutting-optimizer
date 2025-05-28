import React from "react";
import { Settings } from "lucide-react";
import { PACKING_STRATEGIES, type PackingStrategy } from "../types/types";

interface SettingsFormProps {
  kerf: number;
  allowRotation: boolean;
  showWasteZones: boolean;
  showLabels: boolean;
  selectedStrategy: PackingStrategy;
  onKerfChange: (value: number) => void;
  onAllowRotationChange: (value: boolean) => void;
  onShowWasteZonesChange: (value: boolean) => void;
  onShowLabelsChange: (value: boolean) => void;
  onStrategyChange: (value: PackingStrategy) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  kerf,
  allowRotation,
  showWasteZones,
  showLabels,
  selectedStrategy,
  onKerfChange,
  onAllowRotationChange,
  onShowWasteZonesChange,
  onShowLabelsChange,
  onStrategyChange,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kerf (Blade Width)
          </label>
          <input
            type="number"
            step="0.01"
            value={kerf}
            onChange={(e) => onKerfChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={allowRotation}
              onChange={(e) => onAllowRotationChange(e.target.checked)}
              className="mr-2"
            />
            Allow panel rotation
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showWasteZones}
              onChange={(e) => onShowWasteZonesChange(e.target.checked)}
              className="mr-2"
            />
            Show waste zones
          </label>{" "}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => onShowLabelsChange(e.target.checked)}
              className="mr-2"
            />
            Show panel labels
          </label>
        </div>{" "}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Packing Strategy
          </label>
          <select
            value={selectedStrategy}
            onChange={(e) =>
              onStrategyChange(e.target.value as PackingStrategy)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PACKING_STRATEGIES.map((strategy) => (
              <option key={strategy} value={strategy}>
                {strategy === "Auto" ? "Automatic (Best Result)" : strategy}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2 mt-2">
            {PACKING_STRATEGIES.filter((s) => s !== "Auto").map((strategy) => (
              <button
                key={strategy}
                onClick={() => onStrategyChange(strategy)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  selectedStrategy === strategy
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {strategy}
              </button>
            ))}
            <button
              onClick={() => onStrategyChange("Auto")}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                selectedStrategy === "Auto"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Auto (Best)
            </button>
          </div>
          {selectedStrategy !== "Auto" && (
            <div className="text-xs text-orange-600">
              Using manual strategy selection. Auto mode will try all strategies
              and pick the best result.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

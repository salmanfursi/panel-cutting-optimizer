import React from "react";
import { Settings } from "lucide-react";

interface SettingsFormProps {
  kerf: number;
  allowRotation: boolean;
  showWasteZones: boolean;
  showLabels: boolean;
  onKerfChange: (value: number) => void;
  onAllowRotationChange: (value: boolean) => void;
  onShowWasteZonesChange: (value: boolean) => void;
  onShowLabelsChange: (value: boolean) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  kerf,
  allowRotation,
  showWasteZones,
  showLabels,
  onKerfChange,
  onAllowRotationChange,
  onShowWasteZonesChange,
  onShowLabelsChange,
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
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => onShowLabelsChange(e.target.checked)}
              className="mr-2"
            />
            Show panel labels
          </label>
        </div>
      </div>
    </div>
  );
};

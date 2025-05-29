import React, { useState, useEffect } from "react";
import { Settings, Copy, Download } from "lucide-react";
 import type { OptimizationResult } from "/types/types";
import { createGcodeGenerator } from "../classes/GcodeGenerator";

interface GcodeDisplayProps {
  optimizationResult: OptimizationResult | null;
}

export function GcodeDisplay({ optimizationResult }: GcodeDisplayProps) {
  const [gcode, setGcode] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    feedRate: 1000,
    plungeRate: 200,
    cutDepth: -3,
    safeHeight: 5,
    toolDiameter: 3.175,
  });

  useEffect(() => {
    if (optimizationResult) {
      const generator = createGcodeGenerator(settings);
      setGcode(generator.generateGcode(optimizationResult));
    } else {
      setGcode("");
    }
  }, [optimizationResult, settings]);
  const [copied, setCopied] = useState(false);

  const copyGcode = async () => {
    await navigator.clipboard.writeText(gcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadGcode = () => {
    const blob = new Blob([gcode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `panel-cutting-${new Date().toISOString().split("T")[0]}.nc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!optimizationResult) return null;

  return (
    <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">G-code Output</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </button>
          <button
            onClick={copyGcode}
            className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            <Copy className="w-4 h-4 mr-1" />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={downloadGcode}
            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="mb-4 bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            G-code Settings
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Feed Rate (mm/min)
              </label>
              <input
                type="number"
                value={settings.feedRate}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    feedRate: Number(e.target.value),
                  }))
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Plunge Rate (mm/min)
              </label>
              <input
                type="number"
                value={settings.plungeRate}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    plungeRate: Number(e.target.value),
                  }))
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Cut Depth (mm)
              </label>
              <input
                type="number"
                value={settings.cutDepth}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    cutDepth: Number(e.target.value),
                  }))
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Safe Height (mm)
              </label>
              <input
                type="number"
                value={settings.safeHeight}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    safeHeight: Number(e.target.value),
                  }))
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tool Diameter (mm)
              </label>
              <input
                type="number"
                value={settings.toolDiameter}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    toolDiameter: Number(e.target.value),
                  }))
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                step="0.001"
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-96 font-mono">
          {gcode}
        </pre>
      </div>
    </div>
  );
}

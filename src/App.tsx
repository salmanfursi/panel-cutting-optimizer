
import React, { useState, useEffect } from "react";
import { pack } from "efficient-rect-packer";

import { generateGcode } from "./utils";
import AddPanelForm from "./components/AddPanelForm";
import StockSheetForm from "./components/StockSheetForm";
import PanelList from "./components/PanelList";
import CuttingLayout from "./components/CuttingLayout";
import Statistics from "./components/Statistics";
import GcodeOutput from "./components/GcodeOutput";
import type { CuttingOptions, PackingResult, Panel, StockSheet,Statistics as StatsType } from "./types";
 
export default function PanelCuttingOptimizer() {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [stockSheet, setStockSheet] = useState<StockSheet>({ w: 96, h: 48 });
  const [result, setResult] = useState<PackingResult | null>(null);
  const [newPanel, setNewPanel] = useState<Panel>({ id: "", name: "", qty: 1, w: 12, h: 12 });
  const [units] = useState<string>("inch");
  const [error, setError] = useState<string>("");
  const [cuttingOptions, setCuttingOptions] = useState<CuttingOptions>({
    kerf: 0.125,
    respectGrain: false,
    showDimensions: true,
  });
  const [statistics, setStatistics] = useState<StatsType | null>(null);
  const [gcode, setGcode] = useState<string>("");

  useEffect(() => {
    if (panels.length > 0) {
      handleOptimize();
    } else {
      setResult(null);
      setStatistics(null);
    }
  }, [panels, stockSheet, cuttingOptions]);

  const handleAddPanel = () => {
    if (!newPanel.name.trim()) return setError("Panel name required");
    if (newPanel.qty! < 1) return setError("Minimum 1 quantity");
    if (newPanel.w <= 0 || newPanel.h <= 0) return setError("Panel size > 0");
    if (newPanel.w > stockSheet.w || newPanel.h > stockSheet.h)
      return setError("Panel cannot exceed stock size");

    setError("");
    setPanels([...panels, { ...newPanel, id: Date.now().toString() }]);
    setNewPanel({ id: "", name: "", qty: 1, w: 12, h: 12 });
  };

  const handleRemovePanel = (id: string) => {
    const updated = panels.filter((p) => p.id !== id);
    setPanels(updated);
  };

  const handleOptimize = async () => {
    const unitToMM = 25.4;
    const toMM = (v: number) => v * unitToMM;
    const expandedPanels = panels.flatMap((panel) =>
      Array.from({ length: panel.qty! }, (_, index) => ({
        id: `${panel.name}-${index}`,
        name: panel.name,
        w: toMM(panel.w),
        h: toMM(panel.h),
      }))
    );
    const container = {
      w: toMM(stockSheet.w),
      h: toMM(stockSheet.h),
    };

    const packingResult = await pack(expandedPanels, container, {
      padding: toMM(cuttingOptions.kerf),
      noRotation: cuttingOptions.respectGrain,
    });

    const resultInInches = {
      ...packingResult,
      packed_rectangles: packingResult.packed_rectangles.map((rect) => ({
        ...rect,
        x: rect.x / unitToMM,
        y: rect.y / unitToMM,
        w: rect.w / unitToMM,
        h: rect.h / unitToMM,
      })),
    };

    setResult(resultInInches);

    const totalArea = stockSheet.w * stockSheet.h;
    const usedArea = resultInInches.packed_rectangles.reduce(
      (sum, rect) => sum + rect.w * rect.h,
      0
    );
    const wasteArea = totalArea - usedArea;
    const wastePercentage = (wasteArea / totalArea) * 100;
    const totalCuts = resultInInches.packed_rectangles.length * 4;

    setStatistics({
      totalArea: totalArea.toFixed(2),
      usedArea: usedArea.toFixed(2),
      wasteArea: wasteArea.toFixed(2),
      wastePercentage: wastePercentage.toFixed(2),
      totalPanels: resultInInches.packed_rectangles.length,
      unplacedPanels:
        expandedPanels.length - resultInInches.packed_rectangles.length,
      totalCuts,
      efficiency: (100 - wastePercentage).toFixed(2),
    });

    const gcodeText = generateGcode(resultInInches.packed_rectangles);
    setGcode(gcodeText);
  };

  const copyGcode = () => navigator.clipboard.writeText(gcode);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-screen-xl mx-auto">
      {/* LEFT SIDEBAR */}
      <div className="space-y-4">
        <StockSheetForm
          stockSheet={stockSheet} 
          setStockSheet={setStockSheet} 
          units={units} 
        />
        
        <AddPanelForm
          newPanel={newPanel} 
          setNewPanel={setNewPanel} 
          handleAddPanel={handleAddPanel} 
          error={error}
          stockSheet={stockSheet}
        />
        
        <PanelList
          panels={panels} 
          handleRemovePanel={handleRemovePanel} 
        />
      </div>

      {/* MIDDLE - CANVAS */}
      <div className="col-span-2 space-y-4">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">📐 Cutting Layout</h2>
          <CuttingLayout
            result={result} 
            stockSheet={stockSheet} 
            cuttingOptions={cuttingOptions} 
          />
        </div>

        <Statistics statistics={statistics} />
        
        <GcodeOutput gcode={gcode} copyGcode={copyGcode} />
      </div>
    </div>
  );
}

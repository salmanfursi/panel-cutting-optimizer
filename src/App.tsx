// import React from "react";
// import { RotateCcw, Download, Maximize } from "lucide-react";
// import { StockSheetForm } from "./components/StockSheetForm";
// import { SettingsForm } from "./components/SettingsForm";
// import { PanelList } from "./components/PanelList";
// import { Statistics } from "./components/Statistics";
// import { CuttingLayoutVisualization } from "./components/CuttingLayoutVisualization";
// import { GcodeDisplay } from "./components/GcodeDisplay";
// import { CutlistOptimizerEngine } from "./classes/CutlistOptimizerEngine";
// import type { PackingStrategy, Panel, StockSheet } from "types/types";
 
// class App extends React.Component {
//   state = {
//     panels: [] as Panel[],
//     stockSheet: {
//       id: "1",
//       length: 96,
//       width: 48,
//       material: "Plywood",
//       label: "Standard 4x8",
//       cost: 50,
//     } as StockSheet,
//     kerf: 0.125,
//     allowRotation: true,
//     showWasteZones: true,
//     showLabels: true,
//     selectedStrategy: "Auto" as PackingStrategy,
//   };

//   addPanel = () => {
//     const newPanel: Panel = {
//       id: `panel-${Date.now()}`,
//       length: 24,
//       width: 12,
//       quantity: 1,
//       label: `Panel ${this.state.panels.length + 1}`,
//       material: this.state.stockSheet.material,
//     };
//     this.setState((prev) => ({
//       panels: [...prev.panels, newPanel],
//     }));
//   };

//   updatePanel = (id: string, updates: Partial<Panel>) => {
//     this.setState((prev) => ({
//       panels: prev.panels.map((panel) =>
//         panel.id === id ? { ...panel, ...updates } : panel
//       ),
//     }));
//   };

//   removePanel = (id: string) => {
//     this.setState((prev) => ({
//       panels: prev.panels.filter((panel) => panel.id !== id),
//     }));
//   };

//   updateStockSheet = (updates: Partial<StockSheet>) => {
//     this.setState((prev) => ({
//       stockSheet: { ...prev.stockSheet, ...updates },
//     }));
//   };

//   resetAll = () => {
//     this.setState({
//       panels: [],
//     });
//   };

//   exportData = () => {
//     const { stockSheet, panels } = this.state;
//     const optimizationResult = this.getOptimizationResult();
//     const stats = this.getStats();

//     if (!optimizationResult) return;

//     const data = {
//       stockSheet,
//       panels,
//       result: optimizationResult,
//       stats,
//       settings: {
//         kerf: this.state.kerf,
//         allowRotation: this.state.allowRotation,
//         showWasteZones: this.state.showWasteZones,
//         showLabels: this.state.showLabels,
//       },
//     };

//     const blob = new Blob([JSON.stringify(data, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `cutlist-${new Date().toISOString().split("T")[0]}.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };
//   getOptimizationResult = () => {
//     const { panels, stockSheet, kerf, allowRotation, selectedStrategy } =
//       this.state;
//     if (panels.length === 0) return null;

//     const optimizer = new CutlistOptimizerEngine(
//       stockSheet,
//       kerf,
//       allowRotation
//     );
//     return optimizer.optimize(panels, selectedStrategy);
//   };

//   getStats = () => {
//     const { panels, stockSheet } = this.state;
//     const optimizationResult = this.getOptimizationResult();
//     if (!optimizationResult) return null;

//     const totalPanels = panels.reduce((sum, p) => sum + p.quantity, 0);
//     const placedPanels = optimizationResult.placedPanels.length;
//     const largestWaste = optimizationResult.wasteZones.reduce(
//       (max, zone) => (zone.area > max.area ? zone : max),
//       { area: 0, width: 0, height: 0 }
//     );
//     const reusableWaste = optimizationResult.wasteZones.filter(
//       (zone) => zone.width >= 6 && zone.height >= 6
//     ).length;

//     return {
//       totalPanels,
//       placedPanels,
//       efficiency: optimizationResult.efficiency,
//       strategy: optimizationResult.strategy,
//       largestWaste,
//       reusableWaste,
//       materialCost: stockSheet.cost || 0,
//       wasteValue:
//         (optimizationResult.wasteArea / optimizationResult.totalArea) *
//         (stockSheet.cost || 0),
//     };
//   };

//   render() {
//     const {
//       stockSheet,
//       panels,
//       kerf,
//       allowRotation,
//       showWasteZones,
//       showLabels,
//     } = this.state;
//     const optimizationResult = this.getOptimizationResult();
//     const stats = this.getStats();

//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Professional Cutlist Optimizer
//               </h1>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={this.resetAll}
//                   className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
//                 >
//                   <RotateCcw className="w-4 h-4 mr-2" />
//                   Reset
//                 </button>
//                 <button
//                   onClick={this.exportData}
//                   disabled={!optimizationResult}
//                   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Export
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Left Panel - Inputs */}
//               <div className="space-y-6">
//                 <StockSheetForm
//                   stockSheet={stockSheet}
//                   onUpdate={this.updateStockSheet}
//                 />

//                 <SettingsForm
//                   kerf={kerf}
//                   allowRotation={allowRotation}
//                   showWasteZones={showWasteZones}
//                   showLabels={showLabels}
//                   selectedStrategy={this.state.selectedStrategy}
//                   onStrategyChange={(value) =>
//                     this.setState({ selectedStrategy: value })
//                   }
//                   onKerfChange={(value) => this.setState({ kerf: value })}
//                   onAllowRotationChange={(value) =>
//                     this.setState({ allowRotation: value })
//                   }
//                   onShowWasteZonesChange={(value) =>
//                     this.setState({ showWasteZones: value })
//                   }
//                   onShowLabelsChange={(value) =>
//                     this.setState({ showLabels: value })
//                   }
//                 />

//                 <PanelList
//                   panels={panels}
//                   onAddPanel={this.addPanel}
//                   onUpdatePanel={this.updatePanel}
//                   onRemovePanel={this.removePanel}
//                 />
//               </div>

//               {/* Middle Panel - Visualization */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-lg border border-gray-200 p-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       Cutting Layout
//                     </h3>
//                     {stats && (
//                       <div className="flex items-center space-x-4 text-sm">
//                         <span className="text-gray-600">
//                           Efficiency:{" "}
//                           <span className="font-semibold text-green-600">
//                             {stats.efficiency.toFixed(1)}%
//                           </span>
//                         </span>
//                         <span className="text-gray-600">
//                           Strategy:{" "}
//                           <span className="font-semibold text-blue-600">
//                             {stats.strategy}
//                           </span>
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="relative bg-gray-100 rounded-lg p-4 min-h-96">
//                     {optimizationResult ? (
//                       <CuttingLayoutVisualization
//                         result={optimizationResult}
//                         stockSheet={stockSheet}
//                         showWasteZones={showWasteZones}
//                         showLabels={showLabels}
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-96 text-gray-500">
//                         <div className="text-center">
//                           <Maximize className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//                           <p>Add panels to see cutting layout</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>{" "}
//                 {/* Statistics Panel */}
//                 {stats && <Statistics stats={stats} />}
//                 {/* G-code Display */}
//                 {optimizationResult && (
//                   <GcodeDisplay optimizationResult={optimizationResult} />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;










import React, { useState } from "react";
import { RotateCcw, Download, Maximize } from "lucide-react";
import { StockSheetForm } from "./components/StockSheetForm";
import { SettingsForm } from "./components/SettingsForm";
import { PanelList } from "./components/PanelList";
import { Statistics } from "./components/Statistics";
import { CuttingLayoutVisualization } from "./components/CuttingLayoutVisualization";
import { GcodeDisplay } from "./components/GcodeDisplay";
 import type { PackingStrategy, Panel, StockSheet } from "types/types";
import createCutlistOptimizer from "./classes/CutlistOptimizerEngine";
 
const App: React.FC = () => {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [stockSheet, setStockSheet] = useState<StockSheet>({
    id: "1",
    length: 96,
    width: 48,
    material: "Plywood",
    label: "Standard 4x8",
    cost: 50,
  });
  const [kerf, setKerf] = useState(0.125);
  const [allowRotation, setAllowRotation] = useState(true);
  const [showWasteZones, setShowWasteZones] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedStrategy, setSelectedStrategy] =
    useState<PackingStrategy>("Auto");

  const addPanel = () => {
    const newPanel: Panel = {
      id: `panel-${Date.now()}`,
      length: 24,
      width: 12,
      quantity: 1,
      label: `Panel ${panels.length + 1}`,
      material: stockSheet.material,
    };
    setPanels([...panels, newPanel]);
  };

  const updatePanel = (id: string, updates: Partial<Panel>) => {
    setPanels(
      panels.map((panel) =>
        panel.id === id ? { ...panel, ...updates } : panel
      )
    );
  };

  const removePanel = (id: string) => {
    setPanels(panels.filter((panel) => panel.id !== id));
  };

  const resetAll = () => {
    setPanels([]);
  };

  const exportData = () => {
    const optimizationResult = getOptimizationResult();
    const stats = getStats();

    if (!optimizationResult) return;

    const data = {
      stockSheet,
      panels,
      result: optimizationResult,
      stats,
      settings: { kerf, allowRotation, showWasteZones, showLabels },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cutlist-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getOptimizationResult = () => {
    if (panels.length === 0) return null;
    const optimizer = createCutlistOptimizer(stockSheet, kerf, allowRotation);
    return optimizer.optimize(panels, selectedStrategy);
  };

  const getStats = () => {
    const optimizationResult = getOptimizationResult();
    if (!optimizationResult) return null;

    const totalPanels = panels.reduce((sum, p) => sum + p.quantity, 0);
    const placedPanels = optimizationResult.placedPanels.length;
    const largestWaste = optimizationResult.wasteZones.reduce(
      (max, zone) => (zone.area > max.area ? zone : max),
      { area: 0, width: 0, height: 0 }
    );
    const reusableWaste = optimizationResult.wasteZones.filter(
      (zone) => zone.width >= 6 && zone.height >= 6
    ).length;

    return {
      totalPanels,
      placedPanels,
      efficiency: optimizationResult.efficiency,
      strategy: optimizationResult.strategy,
      largestWaste,
      reusableWaste,
      materialCost: stockSheet.cost || 0,
      wasteValue:
        (optimizationResult.wasteArea / optimizationResult.totalArea) *
        (stockSheet.cost || 0),
    };
  };

  const optimizationResult = getOptimizationResult();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Professional Cutlist Optimizer
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={resetAll}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </button>
              <button
                onClick={exportData}
                disabled={!optimizationResult}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4 mr-2" /> Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Inputs */}
            <div className="space-y-6">
              <StockSheetForm
                stockSheet={stockSheet}
                onUpdate={(updates) =>
                  setStockSheet({ ...stockSheet, ...updates })
                }
              />
              <SettingsForm
                kerf={kerf}
                allowRotation={allowRotation}
                showWasteZones={showWasteZones}
                showLabels={showLabels}
                selectedStrategy={selectedStrategy}
                onStrategyChange={setSelectedStrategy}
                onKerfChange={setKerf}
                onAllowRotationChange={setAllowRotation}
                onShowWasteZonesChange={setShowWasteZones}
                onShowLabelsChange={setShowLabels}
              />
              <PanelList
                panels={panels}
                onAddPanel={addPanel}
                onUpdatePanel={updatePanel}
                onRemovePanel={removePanel}
              />
            </div>

            {/* Middle Panel - Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Cutting Layout
                  </h3>
                  {stats && (
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">
                        Efficiency:{" "}
                        <span className="font-semibold text-green-600">
                          {stats.efficiency.toFixed(1)}%
                        </span>
                      </span>
                      <span className="text-gray-600">
                        Strategy:{" "}
                        <span className="font-semibold text-blue-600">
                          {stats.strategy}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="relative bg-gray-100 rounded-lg p-4 min-h-96">
                  {optimizationResult ? (
                    <CuttingLayoutVisualization
                      result={optimizationResult}
                      stockSheet={stockSheet}
                      showWasteZones={showWasteZones}
                      showLabels={showLabels}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-96 text-gray-500">
                      <div className="text-center">
                        <Maximize className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>Add panels to see cutting layout</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {stats && <Statistics stats={stats} />}
              {optimizationResult && (
                <GcodeDisplay optimizationResult={optimizationResult} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
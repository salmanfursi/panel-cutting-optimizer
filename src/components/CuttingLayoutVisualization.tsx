import React from "react";
import type { OptimizationResult, StockSheet } from "src/types/types";
 
interface CuttingLayoutVisualizationProps {
  result: OptimizationResult;
  stockSheet: StockSheet;
  showWasteZones: boolean;
  showLabels: boolean;
}

export function CuttingLayoutVisualization({
  result,
  stockSheet,
  showWasteZones,
  showLabels,
}: CuttingLayoutVisualizationProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 600,
    height: 400,
  });

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth - 20, height: clientHeight - 20 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const scale =
    Math.min(
      dimensions.width / stockSheet.length,
      dimensions.height / stockSheet.width
    ) * 0.9;

  const scaledWidth = stockSheet.length * scale;
  const scaledHeight = stockSheet.width * scale;

  // Generate colors for panels
  const getRandomColor = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
    >
      <div
        className="relative"
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        {/* Stock sheet background */}
        <div
          className="absolute border-4 border-gray-800 bg-white rounded-lg shadow-lg"
          style={{ width: scaledWidth, height: scaledHeight }}
        >
          {/* Grid lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
          >
            {Array.from(
              { length: Math.floor(stockSheet.length / 12) + 1 },
              (_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 12 * scale}
                  y1={0}
                  x2={i * 12 * scale}
                  y2={scaledHeight}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              )
            )}
            {Array.from(
              { length: Math.floor(stockSheet.width / 12) + 1 },
              (_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  y1={i * 12 * scale}
                  x2={scaledWidth}
                  y2={i * 12 * scale}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              )
            )}
          </svg>

          {/* Waste zones */}
          {showWasteZones &&
            result.wasteZones.map((zone, index) => (
              <div
                key={`waste-${index}`}
                className="absolute bg-red-200 border border-red-400 opacity-60"
                style={{
                  left: zone.x * scale,
                  top: zone.y * scale,
                  width: zone.width * scale,
                  height: zone.height * scale,
                }}
              >
                {zone.width * scale > 30 && zone.height * scale > 20 && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-red-700 font-medium">
                    <div className="text-center">
                      <div>{zone.width.toFixed(1)}"</div>
                      <div>×</div>
                      <div>{zone.height.toFixed(1)}"</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          {/* Placed panels */}
          {result.placedPanels.map((panel) => (
            <div
              key={panel.id}
              className="absolute border-2 border-gray-600 rounded shadow-sm"
              style={{
                left: panel.x * scale,
                top: panel.y * scale,
                width: panel.width * scale,
                height: panel.height * scale,
                backgroundColor: getRandomColor(panel.originalPanel.label),
              }}
            >
              {/* Rotation indicator */}
              {panel.rotated && (
                <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              )}

              {/* Panel label and dimensions */}
              {showLabels &&
                panel.width * scale > 40 &&
                panel.height * scale > 30 && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-800 font-medium">
                    <div className="text-center">
                      <div className="font-semibold">
                        {panel.originalPanel.label}
                      </div>
                      <div className="text-gray-600">
                        {panel.originalPanel.length}" ×{" "}
                        {panel.originalPanel.width}"
                      </div>
                      {panel.rotated && (
                        <div className="text-blue-600 text-xs">Rotated</div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          ))}

          {/* Dimensions */}
          <div className="absolute -top-6 left-0 text-sm font-medium text-gray-700">
            {stockSheet.length}"
          </div>
          <div
            className="absolute -left-8 top-0 text-sm font-medium text-gray-700"
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              marginTop: scaledHeight / 2 - 10,
            }}
          >
            {stockSheet.width}"
          </div>
        </div>
      </div>
    </div>
  );
}

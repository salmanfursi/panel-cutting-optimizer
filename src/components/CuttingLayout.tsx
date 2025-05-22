import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import type { CuttingOptions, PackingResult, StockSheet } from '../types';
import { getPanelColor, PADDING, SCALE } from '../utils';
// import { StockSheet, PackingResult, CuttingOptions } from '../types';
// import { SCALE, PADDING, getPanelColor } from '../utils';

interface CuttingLayoutProps {
  result: PackingResult | null;
  stockSheet: StockSheet;
  cuttingOptions: CuttingOptions;
}

const CuttingLayout: React.FC<CuttingLayoutProps> = ({ 
  result, 
  stockSheet, 
  cuttingOptions 
}) => {
  const [hoveredPanel, setHoveredPanel] = React.useState<string | null>(null);

  if (!result) {
    return <p className="text-gray-500 text-sm">Add panels to see layout</p>;
  }

  return (
    <Stage
      width={stockSheet.w * SCALE + PADDING * 2}
      height={stockSheet.h * SCALE + PADDING * 2}
    >
      <Layer>
        {/* STOCK SHEET */}
        <Rect
          x={PADDING}
          y={PADDING}
          width={stockSheet.w * SCALE}
          height={stockSheet.h * SCALE}
          fill="#f0f0f0"
          stroke="#000"
          strokeWidth={1}
        />

        {/* PANEL RECTS */}
        {result.packed_rectangles.map((rect, i) => (
          <Rect
            key={rect.id + i}
            x={rect.x * SCALE + PADDING}
            y={rect.y * SCALE + PADDING}
            width={rect.w * SCALE}
            height={rect.h * SCALE}
            fill={getPanelColor(rect.id)}
            stroke={hoveredPanel === rect.id ? "#f00" : "#333"}
            strokeWidth={hoveredPanel === rect.id ? 2 : 1}
            onMouseEnter={() => setHoveredPanel(rect.id)}
            onMouseLeave={() => setHoveredPanel(null)}
          />
        ))}
      </Layer>

      {cuttingOptions.showDimensions && (
        <Layer>
          {result.packed_rectangles.map((rect, i) => (
            <Text
              key={`txt-${i}`}
              x={rect.x * SCALE + PADDING + 4}
              y={rect.y * SCALE + PADDING + 4}
              text={`${rect.name}\n${rect.w.toFixed(
                1
              )}" x ${rect.h.toFixed(1)}"`}
              fontSize={12}
              fill="#000"
            />
          ))}
        </Layer>
      )}
    </Stage>
  );
};

export default CuttingLayout;
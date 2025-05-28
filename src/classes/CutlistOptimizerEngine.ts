 
import type { OptimizationResult, Panel, StockSheet } from "src/types/types";
import { MaxRectsBinPacker } from "./MaxRectsBinPacker";

export class CutlistOptimizerEngine {
  stockSheet: StockSheet;
  kerf: number;
  allowRotation: boolean;

  constructor(
    stockSheet: StockSheet,
    kerf: number = 0.125,
    allowRotation: boolean = true
  ) {
    this.stockSheet = stockSheet;
    this.kerf = kerf;
    this.allowRotation = allowRotation;
  }

  optimize(panels: Panel[]): OptimizationResult {
    const strategies = [
      "BestShortSideFit",
      "BestLongSideFit",
      "BestAreaFit",
      "BottomLeftRule",
      "ContactPointRule",
    ];

    let bestResult: OptimizationResult | null = null;
    let bestEfficiency = 0;

    // Expand panels by quantity
    const expandedPanels: Panel[] = [];
    panels.forEach((panel) => {
      for (let i = 0; i < panel.quantity; i++) {
        expandedPanels.push({ ...panel, id: `${panel.id}-${i}`, quantity: 1 });
      }
    });

    // Sort panels by area (largest first) for better packing
    expandedPanels.sort((a, b) => b.length * b.width - a.length * a.width);

    for (const strategy of strategies) {
      const result = this.packWithStrategy(expandedPanels, strategy);
      if (result.efficiency > bestEfficiency) {
        bestEfficiency = result.efficiency;
        bestResult = result;
      }
    }

    return bestResult || this.createEmptyResult("None");
  }

  packWithStrategy(panels: Panel[], strategy: string): OptimizationResult {
    const packer = new MaxRectsBinPacker(
      this.stockSheet.length - this.kerf,
      this.stockSheet.width - this.kerf
    );

    const placedPanels = [];

    for (const panel of panels) {
      const adjustedLength = panel.length + this.kerf;
      const adjustedWidth = panel.width + this.kerf;

      const placed = packer.insert(
        adjustedLength,
        adjustedWidth,
        strategy,
        panel,
        this.allowRotation
      );

      if (placed) {
        placedPanels.push(placed);
      }
    }

    const wasteZones = packer.findWasteZones();
    const totalArea = this.stockSheet.length * this.stockSheet.width;
    const usedArea = placedPanels.reduce(
      (sum, panel) => sum + panel.width * panel.height,
      0
    );
    const wasteArea = totalArea - usedArea;
    const efficiency = (usedArea / totalArea) * 100;

    return {
      placedPanels,
      wasteZones,
      efficiency,
      totalArea,
      usedArea,
      wasteArea,
      strategy,
    };
  }

  createEmptyResult(strategy: string): OptimizationResult {
    const totalArea = this.stockSheet.length * this.stockSheet.width;
    return {
      placedPanels: [],
      wasteZones: [
        {
          x: 0,
          y: 0,
          width: this.stockSheet.length,
          height: this.stockSheet.width,
          area: totalArea,
        },
      ],
      efficiency: 0,
      totalArea,
      usedArea: 0,
      wasteArea: totalArea,
      strategy,
    };
  }
}

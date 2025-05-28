export interface Panel {
  id: string;
  length: number;
  width: number;
  quantity: number;
  label: string;
  material: string;
}

export interface StockSheet {
  id: string;
  length: number;
  width: number;
  material: string;
  label: string;
  cost?: number;
}

export interface PlacedPanel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
  originalPanel: Panel;
}

export interface WasteZone {
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
}

export type PackingStrategy =
  | "BestShortSideFit"
  | "BestLongSideFit"
  | "BestAreaFit"
  | "BottomLeftRule"
  | "ContactPointRule"
  | "Auto";

export const PACKING_STRATEGIES: PackingStrategy[] = [
  "Auto",
  "BestShortSideFit",
  "BestLongSideFit",
  "BestAreaFit",
  "BottomLeftRule",
  "ContactPointRule",
];

export interface OptimizationResult {
  placedPanels: PlacedPanel[];
  wasteZones: WasteZone[];
  efficiency: number;
  totalArea: number;
  usedArea: number;
  wasteArea: number;
  strategy: PackingStrategy;
}

export interface GcodeSettings {
  feedRate: number;
  plungeRate: number;
  cutDepth: number;
  safeHeight: number;
  toolDiameter: number;
}

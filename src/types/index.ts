export interface Panel {
  id: string;
  name: string;
  w: number;
  h: number;
  qty?: number;
}

export interface StockSheet {
  w: number;
  h: number;
}

export interface CuttingOptions {
  kerf: number;
  respectGrain: boolean;
  showDimensions: boolean;
}

export default interface Statistics {
  totalArea: string;
  usedArea: string;
  wasteArea: string;
  wastePercentage: string;
  totalPanels: number;
  unplacedPanels: number;
  totalCuts: number;
  efficiency: string;
}

export interface PackedRectangle extends Panel {
  x: number;
  y: number;
}

export interface PackingResult {
  packed_rectangles: PackedRectangle[];
}
import type { PackedRectangle } from "../types";

export const SCALE = 5;
export const PADDING = 40;

export const getPanelColor = (id: string): string => {
  const colors = [
    "#FFD3B5",
    "#C7CEEA",
    "#DCEDC2",
    "#FFD3E0",
    "#B5EAD7",
    "#E2F0CB",
    "#FFDAC1",
    "#D8E2DC",
  ];
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export const generateGcode = (rects: PackedRectangle[]): string => {
  const toMM = (v: number) => (v * 25.4).toFixed(2);
  let code = `; Panel Cutting G-code\nG21 ; mm\nG90 ; abs pos\n`;
  rects.forEach((rect, i) => {
    const x = toMM(rect.x);
    const y = toMM(rect.y);
    const w = toMM(rect.w);
    const h = toMM(rect.h);
    code += `; Panel ${i + 1}: ${rect.name}\nG0 X${x} Y${y}\n`;
    code += `G1 X${parseFloat(x) + parseFloat(w)} Y${y}\n`;
    code += `G1 X${parseFloat(x) + parseFloat(w)} Y${
      parseFloat(y) + parseFloat(h)
    }\n`;
    code += `G1 X${x} Y${parseFloat(y) + parseFloat(h)}\n`;
    code += `G1 X${x} Y${y}\n`;
  });
  return code;
};
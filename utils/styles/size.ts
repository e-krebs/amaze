import { Size } from "../../interfaces";

export type SizeDefinition = {
  width: string;
  height: string;
  grid: string;
};

export const sizeClass: Record<Size, SizeDefinition> = {
  S: { width: 'w-4', height: 'h-4', grid: 'pt-4 pl-4' },
  M: { width: 'w-8', height: 'h-8', grid: 'pt-8 pl-8' },
  L: { width: 'w-12', height: 'h-12', grid: 'pt-12 pl-12' },
  XL: { width: 'w-16', height: 'h-16', grid: 'pt-16 pl-16' },
};

export const pixelSize: Record<Size, number> = {
  S: 4 * 4,
  M: 8 * 4,
  L: 12 * 4,
  XL: 16 * 4,
};

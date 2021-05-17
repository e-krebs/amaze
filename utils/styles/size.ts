import { Size } from "../../interfaces";

export type SizeDefinition = {
  width: string;
  height: string;
};

export const sizeClass: Record<Size, SizeDefinition> = {
  S: { width: 'w-4', height: 'h-4' },
  M: { width: 'w-8', height: 'h-8' },
  L: { width: 'w-12', height: 'h-12' },
  XL: { width: 'w-16', height: 'h-16' },
};

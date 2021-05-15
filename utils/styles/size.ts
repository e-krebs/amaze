import { Size } from "../../interfaces";

export type SizeDefinition = {
  width: string;
  height: string;
  item: string;
};

export const sizeClass: Record<Size, SizeDefinition> = {
  S: { width: 'w-4', height: 'h-4', item: 'w-2' },
  M: { width: 'w-8', height: 'h-8', item: 'w-4' },
  L: { width: 'w-12', height: 'h-12', item: 'w-6' },
  XL: { width: 'w-16', height: 'h-16', item: 'w-8' }
};

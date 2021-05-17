export const AllSizes = ['S', 'M', 'L', 'XL'] as const;

export type Size = (typeof AllSizes)[number];

export type Direction = 'north' | 'east' | 'south' | 'west';
export type Position = 'center' | Direction;

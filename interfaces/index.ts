export const AllSizes = ['S', 'M', 'L', 'XL'] as const;

export type Size = (typeof AllSizes)[number];

export type Cols = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Direction = 'north' | 'east' | 'south' | 'west';
export type Position = 'center' | Direction;

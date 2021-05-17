export const AllSizes = ['S', 'M', 'L', 'XL'] as const;

export type Size = (typeof AllSizes)[number];

export type MazeWallState = 'open' | 'closed';

export type MazeWall = 'north' | 'west';
export type MazeNeigbhorsWall = 'south' | 'east';
export type Position = 'center' | MazeWall | MazeNeigbhorsWall;

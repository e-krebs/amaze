export const AllSizes = ['S', 'M', 'L', 'XL'] as const;

export type Size = (typeof AllSizes)[number];

export type Coordinates = [number, number];

export type MazeWallState = 'open' | 'closed';
export type MazeWall = 'top' | 'left';
export type MazeNeigbhorsWall = 'bottom' | 'right';

export type Position = 'center' | MazeWall | MazeNeigbhorsWall;

export type MazeCell = Partial<Record<MazeWall, MazeWallState>>;
export type MazeGrid = MazeCell[][];
export type MazeData = {
  entry?: Coordinates;
  exits: [Coordinates, ...Coordinates[]];
  grid: MazeGrid;
};

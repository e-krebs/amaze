export type Size = 'S' | 'M' | 'L' | 'XL';

export type Coordinates = [number, number];

export type MazeWallState = 'open' | 'closed';
export type MazeWall = 'top' | 'left';
export type MazeNeigbhorsWall = 'bottom' | 'right';

export type MazeCell = Partial<Record<MazeWall, MazeWallState>>;
export type MazeGrid = MazeCell[][];
export type MazeData = {
  entry?: Coordinates;
  exits: [Coordinates, ...Coordinates[]];
  grid: MazeGrid;
};

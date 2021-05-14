import { Coordinates, MazeCell, MazeData, MazeNeigbhorsWall, MazeWall } from "../interfaces";

export const getCell = (data: MazeData, [x, y]: Coordinates): MazeCell | undefined => {
  const line = data.grid[y];
  if (line) {
    return line[x];
  }
};

export const isCell = (entry: Coordinates = [0, 0], [x, y]: Coordinates): boolean =>
  entry[0] === x && entry[1] === y;

export const isOneOfCells = (
  exits: [Coordinates, ...Coordinates[]],
  x: number,
  y: number
): boolean =>
  exits.map((exit) => isCell(exit, [x, y])).reduce((x, y) => x || y);

export const getEntryCoordinates = (data: MazeData): Coordinates => data.entry ?? [0, 0];

export const getEntryDirections = (
  data: MazeData,
  coordinates: Coordinates
): Record<MazeWall, boolean> => {
  if (!isCell(getEntryCoordinates(data), coordinates)) {
    return { left: false, top: false };
  }

  const cell = getCell(data, coordinates);
  return {
    left: cell?.left !== 'closed',
    top: cell?.top !== 'closed'
  }
}

export const getExitDirections = (
  data: MazeData,
  [x, y]: Coordinates
): Record<MazeNeigbhorsWall, boolean> => {
  if (!isOneOfCells(data.exits, x, y)) {
    return { right: false, bottom: false };
  }

  const rightCell = getCell(data, [x + 1, y]);
  const bottomCell = getCell(data, [x, y + 1]);
  return {
    right: rightCell?.left !== 'closed',
    bottom: bottomCell?.top !== 'closed'
  }
}

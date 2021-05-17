import { Coordinates, MazeNeigbhorsWall, MazeWall } from "../interfaces";
import { MazeCell } from "../models/MazeCell";
import { MazeData } from "../models/MazeData";

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
): Record<MazeWall | MazeNeigbhorsWall, boolean> => {
  if (!isCell(getEntryCoordinates(data), coordinates)) {
    return { left: false, right: false, top: false, bottom: false };
  }

  const [x, y] = coordinates;

  const cell = getCell(data, coordinates);
  const rightCell = getCell(data, [x + 1, y]);
  const bottomCell = getCell(data, [x, y + 1]);

  return {
    left: cell?.left !== 'closed' && x === 0,
    top: cell?.top !== 'closed' && y === 0,
    right: rightCell?.left !== 'closed' && getCell(data, [x + 2, y]) === undefined,
    bottom: bottomCell?.top !== 'closed' && getCell(data, [x, y + 2]) === undefined,
  };
}

export const getExitDirections = (
  data: MazeData,
  [x, y]: Coordinates
): Record<MazeWall | MazeNeigbhorsWall, boolean> => {
  if (!isOneOfCells(data.exits, x, y)) {
    return { left: false, right: false, top: false, bottom: false };
  }

  const cell = getCell(data, [x, y]);
  const rightCell = getCell(data, [x + 1, y]);
  const bottomCell = getCell(data, [x, y + 1]);
  return {
    left: cell?.left !== 'closed' && x === 0,
    top: cell?.top !== 'closed' && y === 0,
    right: rightCell?.left !== 'closed'  && getCell(data, [x + 2, y]) === undefined,
    bottom: bottomCell?.top !== 'closed' && getCell(data, [x, y + 2]) === undefined,
  }
}

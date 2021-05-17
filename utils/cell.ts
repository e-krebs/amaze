import { Coordinates } from "../interfaces";

export const isCell = (entry: Coordinates = [0, 0], [x, y]: Coordinates): boolean =>
  entry[0] === x && entry[1] === y;

export const isOneOfCells = (
  exits: [Coordinates, ...Coordinates[]],
  [x, y]: Coordinates
): boolean =>
  exits.map((exit) => isCell(exit, [x, y])).reduce((x, y) => x || y);

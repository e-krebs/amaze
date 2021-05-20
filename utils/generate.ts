import { Cols } from "../interfaces";
import { Coordinates } from "../models/Coordinates";
import { MazeCell } from "../models/MazeCell";
import { MazeData } from "../models/MazeData";
import { CoordinatesPair } from "../models/typing";

const randomInt = (max: number, min: number = 0): number =>
  min + Math.round(Math.random() * (max - min) - 0.5);

const shuffle = <T>(input: T[]): T[] => {
  for (let i = input.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [input[i], input[j]] = [input[j], input[i]];
  }
  return input;
}

const getNextCells = (
  maze: MazeData,
  currentCell: Coordinates,
  alreadyVisited: Coordinates[] = []
): Coordinates[] => {
  const nextCells: Coordinates[] = [];
  if (!maze.isLastNorth(currentCell)) {
    const northCell = maze.getNorthCellCoordinates(currentCell);
    if (!northCell.isOneOfCells(alreadyVisited)) nextCells.push(northCell);
  }
  if (!maze.isLastEast(currentCell)) {
    const eastCell = maze.getEastCellCoordinates(currentCell);
    if (!eastCell.isOneOfCells(alreadyVisited)) nextCells.push(eastCell);
  }
  if (!maze.isLastSouth(currentCell)) {
    const southCell = maze.getSouthCellCoordinates(currentCell);
    if (!southCell.isOneOfCells(alreadyVisited)) nextCells.push(southCell);
  }
  if (!maze.isLastWest(currentCell)) {
    const westCell = maze.getWestCellCoordinates(currentCell);
    if (!westCell.isOneOfCells(alreadyVisited)) nextCells.push(westCell);
  }
  return shuffle(nextCells);
}

const openPath = (maze: MazeData, start: Coordinates, exit: Coordinates): MazeData => {
  if (maze.getNorthCellCoordinates(start).isCell(exit)) {
    maze.grid[start.y][start.x].north = false;
  }
  if (maze.getWestCellCoordinates(start).isCell(exit)) {
    maze.grid[start.y][start.x].west = false;
  }
  if (maze.getNorthCellCoordinates(exit).isCell(start)) {
    maze.grid[exit.y][exit.x].north = false;
  }
  if (maze.getWestCellCoordinates(exit).isCell(start)) {
    maze.grid[exit.y][exit.x].west = false;
  }
  return maze;
}

let depth: number = 0;

const navigate = (
  maze: MazeData,
  currentCell: Coordinates = maze.entry,
  path: Coordinates[] = [currentCell],
  i: number = 0,
): Coordinates[] | null => {
  if (depth >= maze.nbCols * maze.nbCols) return null;
  depth++;

  const nextCells = getNextCells(maze, currentCell, path);
  for (const nextCell of nextCells) {
    const newPath = [...path, nextCell];
    if (nextCell.isOneOfCells(maze.exits)) {
      return newPath;
    }
    const finalMaze = navigate(maze, nextCell, newPath, i + 1);
    if (finalMaze) return finalMaze;
  }
  return null;
}
const getPath = async (maze: MazeData, size: Cols): Promise<Coordinates[]> => {
  const minSize = Math.pow(size - 1, 2);
  const maxSize = Math.pow(size, 2);

  return new Promise((resolve) => {
    while (true) {
      depth = 0;
      let path = navigate(maze);
      if (path && path.length >= minSize && path.length <= maxSize) {
        resolve(path);
        break;
      }
    }
  })
};

export const generate = async (size: Cols): Promise<MazeData> => {
  const entry: CoordinatesPair = [randomInt(size), 0];
  const entryCoordinates: Coordinates = Coordinates.fromArray(entry);

  const exit: CoordinatesPair = [randomInt(size), size - 1];
  const exitCoordinates: Coordinates = Coordinates.fromArray(exit);

  const grid: MazeCell[][] = [];
  for (let y = 0; y <= size; y++) {
    const line: MazeCell[] = [];
    for (let x = 0; x <= size; x++) {
      const coordinates = Coordinates.fromArray([x, y]);
      const northCoordinates = Coordinates.fromArray([x, y - 1]);
      const cell: MazeCell = {
        north: x < size && !coordinates.isCell(entryCoordinates) && !northCoordinates.isCell(exitCoordinates),
        west: y < size,
      };
      line.push(cell);
    }
    grid.push(line);
  }

  let maze = new MazeData({ grid, entry, exits: [exit] });

  const path: Coordinates[] = await getPath(maze, size);

  for (let i = 0; i < path.length - 1; i++) {
    maze = openPath(maze, path[i], path[i + 1]);
  }
  // TODO: deal with unreachable cells
  return maze;
}

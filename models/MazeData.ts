import { Cols } from "../interfaces";
import { Coordinates } from "./Coordinates";
import { Directions } from "./Directions";
import { MazeCell } from "./MazeCell";
import { CoordinatesPair } from "./typing";

type NonEmptyArray<T> = [T, ...T[]];

interface MazeDataJSON {
  entry: CoordinatesPair,
  exits: NonEmptyArray<CoordinatesPair>,
  grid: MazeCell[][],
}

export class MazeData {
  private _entry?: Coordinates;
  public exits: NonEmptyArray<Coordinates>;
  public grid: MazeCell[][];

  constructor(init: MazeDataJSON) {
    this._entry = Coordinates.fromArray(init.entry);
    this.exits = init.exits.map(exit => Coordinates.fromArray(exit)) as NonEmptyArray<Coordinates>;
    this.grid = init.grid.map(line => line.map(cell => new MazeCell(cell)));
  }

  public get entry(): Coordinates {
    return this._entry ?? new Coordinates();
  }

  private getCellFromArray = ([x, y]: CoordinatesPair): MazeCell | undefined => {
    const line = this.grid[y];
    if (line) {
      return line[x];
    }
  }

  public getCell = (coordinates: Coordinates): MazeCell | undefined =>
    this.getCellFromArray([coordinates.x, coordinates.y]);

  public get nbCols(): Cols {
    const nbCols = Math.max(0, ...this.grid.map(line => line.length));
    return Math.min(nbCols, 12) as Cols;
  }

  private getNextCells = (
    currentCell: Coordinates,
    alreadyVisited: Coordinates[] = []
  ): Coordinates[] => {
    const nextCells: Coordinates[] = [];
    if (this.isNorthOpen(currentCell, false)) {
      const northCell = this.getNorthCellCoordinates(currentCell);
      if (!northCell.isOneOfCells(alreadyVisited)) nextCells.push(northCell);
    }
    if (this.isEastOpen(currentCell, false)) {
      const eastCell = this.getEastCellCoordinates(currentCell);
      if (!eastCell.isOneOfCells(alreadyVisited)) nextCells.push(eastCell);
    }
    if (this.isSouthOpen(currentCell, false)) {
      const southCell = this.getSouthCellCoordinates(currentCell);
      if (!southCell.isOneOfCells(alreadyVisited)) nextCells.push(southCell);
    }
    if (this.isWestOpen(currentCell, false)) {
      const westCell = this.getWestCellCoordinates(currentCell);
      if (!westCell.isOneOfCells(alreadyVisited)) nextCells.push(westCell);
    }
    return nextCells;
  }

  private navigate = (
    currentCell: Coordinates,
    path: Coordinates[] = [currentCell]
  ): Coordinates[] | null => {
    const nextCells = this.getNextCells(currentCell, path);
    for (const nextCell of nextCells) {
      const newPath = [...path, nextCell];
      if (nextCell.isOneOfCells(this.exits)) {
        return newPath;
      }
      const finalPath = this.navigate(nextCell, newPath);
      if (finalPath) return finalPath;
    }
    return null;
  }

  public getSolution = (start: Coordinates | null): Coordinates[] | null =>
    (start === null) ? null : this.navigate(start);

  //#region move methods
  public moveNorth = (position: Coordinates | null): Coordinates | null => {
    if (position === null || !this.isNorthOpen(position, false)) return position;
    const newCell = this.getNorthCellCoordinates(position);
    return this.isExit(newCell) ? null : newCell;
  }

  public moveEast = (position: Coordinates | null): Coordinates | null => {
    if (position === null || !this.isEastOpen(position)) return position;
    const newCell = this.getEastCellCoordinates(position);
    return this.isExit(newCell) ? null : newCell;
  }

  public moveSouth = (position: Coordinates | null): Coordinates | null => {
    if (position === null || !this.isSouthOpen(position)) return position;
    const newCell = this.getSouthCellCoordinates(position);
    return this.isExit(newCell) ? null : newCell;
  }

  public moveWest = (position: Coordinates | null): Coordinates | null => {
    if (position === null || !this.isWestOpen(position)) return position;
    const newCell = this.getWestCellCoordinates(position);
    return this.isExit(newCell) ? null : newCell;
  }
  //#endregion

  //#region open/closed methods
  public isNorthClosed = (coordinates: Coordinates): boolean =>
    this.getCell(coordinates)?.north === true;

  public isEastClosed = (coordinates: Coordinates): boolean =>
    this.getCell(this.getEastCellCoordinates(coordinates))?.west === true;

  public isSouthClosed = (coordinates: Coordinates): boolean =>
    this.getCell(this.getSouthCellCoordinates(coordinates))?.north === true;

  public isWestClosed = (coordinates: Coordinates): boolean =>
    this.getCell(coordinates)?.west === true;

  public isNorthOpen = (coordinates: Coordinates | null, lastIsOpen: boolean = true): boolean =>
    coordinates !== null && !this.isNorthClosed(coordinates) && (lastIsOpen || !this.isLastNorth(coordinates));

  public isEastOpen = (coordinates: Coordinates | null, lastIsOpen: boolean = true): boolean =>
    coordinates !== null && !this.isEastClosed(coordinates) && (lastIsOpen || !this.isLastEast(coordinates));

  public isSouthOpen = (coordinates: Coordinates | null, lastIsOpen: boolean = true): boolean =>
    coordinates !== null && !this.isSouthClosed(coordinates) && (lastIsOpen || !this.isLastSouth(coordinates));

  public isWestOpen = (coordinates: Coordinates | null, lastIsOpen: boolean = true): boolean =>
    coordinates !== null && !this.isWestClosed(coordinates) && (lastIsOpen || !this.isLastWest(coordinates));
  //#endregion

  //#region isLast & getCellCoordinates
  public isLastNorth = (coordinates: Coordinates): boolean => coordinates.y === 0;

  public isLastEast = (coordinates: Coordinates): boolean =>
    !this.getCellFromArray([coordinates.x + 2, coordinates.y]);

  public isLastSouth = (coordinates: Coordinates): boolean =>
    !this.getCellFromArray([coordinates.x, coordinates.y + 2]);

  public isLastWest = (coordinates: Coordinates): boolean => coordinates.x === 0;

  public getNorthCellCoordinates = (coordinates: Coordinates): Coordinates =>
    Coordinates.fromArray([coordinates.x, coordinates.y - 1]);

  public getEastCellCoordinates = (coordinates: Coordinates): Coordinates =>
    Coordinates.fromArray([coordinates.x + 1, coordinates.y]);

  public getSouthCellCoordinates = (coordinates: Coordinates): Coordinates =>
    Coordinates.fromArray([coordinates.x, coordinates.y + 1]);

  public getWestCellCoordinates = (coordinates: Coordinates): Coordinates =>
    Coordinates.fromArray([coordinates.x - 1, coordinates.y]);
  //#endregion

  //#region directions information (entry, exits)
  private getDirections = (coordinates: Coordinates, condition: boolean): Directions => {
    let north = false, east = false, south = false, west = false;

    if (condition) {
      north = this.isNorthOpen(coordinates) && this.isLastNorth(coordinates);
      east = this.isEastOpen(coordinates) && this.isLastEast(coordinates);
      south = this.isSouthOpen(coordinates) && this.isLastSouth(coordinates);
      west = this.isWestOpen(coordinates) && this.isLastWest(coordinates);
    }

    return new Directions({ north, east, south, west });
  }

  public isExit = (coordinates: Coordinates): boolean => coordinates.isOneOfCells(this.exits);
  public isEntry = (coordinates: Coordinates): boolean => coordinates.isCell(this.entry);

  public getEntryDirections = (coordinates: Coordinates): Directions =>
    this.getDirections(coordinates, this.isEntry(coordinates));

  public getExitDirections = (coordinates: Coordinates): Directions =>
    this.getDirections(coordinates, this.isExit(coordinates));
  //#endregion
}

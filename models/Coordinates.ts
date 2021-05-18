import { CoordinatesPair } from "./typing";

export class Coordinates {
  public x: number;
  public y: number;

  constructor(init?: Record<'x' | 'y', number>) {
    this.x = init?.x ?? 0;
    this.y = init?.y ?? 0;
  }

  public toString(): string { return `${this.x},${this.y}`; }

  public isCell = (coordinates: Coordinates | null): boolean =>
    coordinates !== null && this.x === coordinates.x && this.y === coordinates.y;

  public isOneOfCells = (coordinatesArray: Coordinates[]): boolean =>
    coordinatesArray.length <= 0
      ? false
      : coordinatesArray.map(coordinates => this.isCell(coordinates)).reduce((x, y) => x || y);

  public toArray = (): CoordinatesPair => [this.x, this.y];

  static fromArray = (coordinates?: CoordinatesPair): Coordinates =>
    new Coordinates({
      x: coordinates && coordinates[0] ? coordinates[0] : 0,
      y: coordinates && coordinates[1] ? coordinates[1] : 0,
    });
}

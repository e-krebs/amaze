import { Coordinates } from "../interfaces";
import { MazeCell } from "./MazeCell";

export class MazeData {
  public entry?: Coordinates;
  public exits: [Coordinates, ...Coordinates[]];
  public grid: MazeCell[][];

  constructor(init: MazeData) {
    this.entry = init.entry;
    this.exits = init.exits;
    this.grid = init.grid.map(line => line.map(cell => new MazeCell(cell)));
  }
}

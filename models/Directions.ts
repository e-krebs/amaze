import { MazeNeigbhorsWall, MazeWall } from "../interfaces";

export class Directions {
  public north: boolean;
  public east: boolean;
  public south: boolean;
  public west: boolean;

  constructor(init: Record<MazeWall | MazeNeigbhorsWall, boolean>) {
    this.north = init.north;
    this.east = init.east;
    this.south = init.south;
    this.west = init.west;
  }

  public get isOpen(): boolean {
    return this.north || this.east || this.south || this.west
  };
}

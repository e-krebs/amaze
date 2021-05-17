import { MazeWallState } from "../interfaces";

export class MazeCell {
  public north?: MazeWallState;
  public west?: MazeWallState;

  constructor(init?: MazeCell) {
    this.north = init?.north;
    this.west = init?.west;
  }
}

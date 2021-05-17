import { MazeWallState } from "../interfaces";

export class MazeCell {
  public top?: MazeWallState;
  public left?: MazeWallState;

  constructor(init?: MazeCell) {
    this.top = init?.top;
    this.left = init?.left;
  }
}

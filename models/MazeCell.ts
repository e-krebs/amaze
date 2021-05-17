export class MazeCell {
  public north?: boolean;
  public west?: boolean;

  constructor(init?: MazeCell) {
    this.north = init?.north;
    this.west = init?.west;
  }
}

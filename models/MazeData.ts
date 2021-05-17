import { Coordinates, MazeNeigbhorsWall, MazeWall } from "../interfaces";
import { isCell, isOneOfCells } from "../utils/cell";
import { MazeCell } from "./MazeCell";

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type ExtractJson<T> = Pick<T, NonFunctionPropertyNames<T>>;

export class MazeData {
  private _entry?: Coordinates;
  public exits: [Coordinates, ...Coordinates[]];
  public grid: MazeCell[][];

  constructor(init: ExtractJson<MazeData>) {
    this._entry = init.entry;
    this.exits = init.exits;
    this.grid = init.grid.map(line => line.map(cell => new MazeCell(cell)));
  }

  public get entry(): Coordinates {
    return this._entry ?? [0, 0];
  }

  public getEntryDirections([x, y]: Coordinates): Record<MazeWall | MazeNeigbhorsWall, boolean> {
    if (!isCell(this.entry, [x, y])) {
      return { left: false, right: false, top: false, bottom: false };
    }
  
    const cell = this.getCell([x, y]);
    const rightCell = this.getCell([x + 1, y]);
    const bottomCell = this.getCell([x, y + 1]);
  
    return {
      left: cell?.left !== 'closed' && x === 0,
      top: cell?.top !== 'closed' && y === 0,
      right: rightCell?.left !== 'closed' && this.getCell([x + 2, y]) === undefined,
      bottom: bottomCell?.top !== 'closed' && this.getCell([x, y + 2]) === undefined,
    };
  }

  public getExitDirections([x, y]: Coordinates): Record<MazeWall | MazeNeigbhorsWall, boolean> {
    if (!isOneOfCells(this.exits, x, y)) {
      return { left: false, right: false, top: false, bottom: false };
    }
  
    const cell = this.getCell([x, y]);
    const rightCell = this.getCell([x + 1, y]);
    const bottomCell = this.getCell([x, y + 1]);
    return {
      left: cell?.left !== 'closed' && x === 0,
      top: cell?.top !== 'closed' && y === 0,
      right: rightCell?.left !== 'closed'  && this.getCell([x + 2, y]) === undefined,
      bottom: bottomCell?.top !== 'closed' && this.getCell([x, y + 2]) === undefined,
    }
  }

  public getCell([x, y]: Coordinates): MazeCell | undefined {
    const line = this.grid[y];
    if (line) {
      return line[x];
    }
  }
}

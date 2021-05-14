import { MazeData } from "../interfaces";

export const sampleMaze: MazeData = {
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { }],
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }],
  ]
};

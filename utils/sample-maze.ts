import { MazeData } from "../interfaces";

export const sampleMaze0: MazeData = {
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { }],
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }],
  ]
};

export const sampleMaze1: MazeData = {
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { }],
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }],
  ]
};

export const sampleMaze2: MazeData = {
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed' }, { top: 'closed' }, { }],
  ]  
};  

export const sampleMaze3: MazeData = {
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed' }, { top: 'closed' }, { }],
  ]
};

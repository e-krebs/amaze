import { MazeData } from "../models/MazeData";

export const sampleMaze0 = new MazeData({
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { }],
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }],
  ]
});

export const sampleMaze1 = new MazeData({
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { }],
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }],
  ]
});

export const sampleMaze2 = new MazeData({
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed' }, { top: 'closed' }, { }],
  ]  
});  

export const sampleMaze3 = new MazeData({
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ top: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed', left: 'closed' }, { top: 'closed' }, { }, { left: 'closed' }],
    [{ left: 'closed' }, { top: 'closed' }, { top: 'closed' }, { left: 'closed' }],
    [{ top: 'closed' }, { top: 'closed' }, { }],
  ]
});

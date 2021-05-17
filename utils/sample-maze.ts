import { MazeData } from "../models/MazeData";

export const sampleMaze0 = new MazeData({
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ west: 'closed' }, { north: 'closed' }, { north: 'closed' }, { west: 'closed' }],
    [{ north: 'closed', west: 'closed' }, { north: 'closed' }, { }, { west: 'closed' }],
    [{ west: 'closed' }, { north: 'closed' }, { north: 'closed' }, { }],
    [{ north: 'closed' }, { north: 'closed' }, { north: 'closed' }],
  ]
});

export const sampleMaze1 = new MazeData({
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ west: 'closed' }, { north: 'closed' }, { north: 'closed' }, { west: 'closed' }],
    [{ north: 'closed', west: 'closed' }, { north: 'closed' }, { }, { west: 'closed' }],
    [{ west: 'closed' }, { north: 'closed' }, { north: 'closed' }, { }],
    [{ north: 'closed' }, { north: 'closed' }, { north: 'closed' }],
  ]
});

export const sampleMaze2 = new MazeData({
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ north: 'closed' }, { north: 'closed' }, { north: 'closed' }, { west: 'closed' }],
    [{ north: 'closed', west: 'closed' }, { north: 'closed' }, { }, { west: 'closed' }],
    [{ west: 'closed' }, { north: 'closed' }, { north: 'closed' }, { west: 'closed' }],
    [{ north: 'closed' }, { north: 'closed' }, { }],
  ]  
});  

export const sampleMaze3 = new MazeData({
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ north: 'closed' }, { north: 'closed' }, { north: 'closed' }, { west: 'closed' }],
    [{ north: 'closed', west: 'closed' }, { north: 'closed' }, { }, { west: 'closed' }],
    [{ west: 'closed' }, { north: 'closed' }, { north: 'closed' }, { west: 'closed' }],
    [{ north: 'closed' }, { north: 'closed' }, { }],
  ]
});

import { MazeData } from "../models/MazeData";

export const sampleMaze0 = new MazeData({
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ west: true }, { north: true }, { north: true }, { west: true }],
    [{ north: true, west: true }, { north: true }, { }, { west: true }],
    [{ west: true }, { north: true }, { north: true }, { }],
    [{ north: true }, { north: true }, { north: true }],
  ]
});

export const sampleMaze1 = new MazeData({
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ west: true }, { north: true }, { north: true }, { west: true }],
    [{ north: true, west: true }, { north: true }, { }, { west: true }],
    [{ west: true }, { north: true }, { north: true }, { }],
    [{ north: true }, { north: true }, { north: true }],
  ]
});

export const sampleMaze2 = new MazeData({
  entry: [0, 0],
  exits: [[2, 2]],
  grid: [
    [{ north: true }, { north: true }, { north: true }, { west: true }],
    [{ north: true, west: true }, { north: true }, { }, { west: true }],
    [{ west: true }, { north: true }, { north: true }, { west: true }],
    [{ north: true }, { north: true }, { }],
  ]  
});  

export const sampleMaze3 = new MazeData({
  entry: [2, 2],
  exits: [[0, 0]],
  grid: [
    [{ north: true }, { north: true }, { north: true }, { west: true }],
    [{ north: true, west: true }, { north: true }, { }, { west: true }],
    [{ west: true }, { north: true }, { north: true }, { west: true }],
    [{ north: true }, { north: true }, { }],
  ]
});

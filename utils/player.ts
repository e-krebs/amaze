import { Coordinates } from "../interfaces";
import { MazeData } from "../models/MazeData";
import { PlayerInfo } from "./contexts/PlayerContext";

export const moveRight = (data: MazeData, player?: PlayerInfo): Coordinates => {
  if (!player) throw Error('no player info when going right!');
  const { position, canMove } = player;
  if (!canMove) return position;
  if (!data.getCell([position[0] + 2, position[1]])) return position;
  const newPosition: Coordinates = [position[0] + 1, position[1]];
  const rightCell = data.getCell(newPosition);
  return rightCell !== undefined && rightCell.left !== 'closed' ? newPosition : position;
}

export const moveLeft = (data: MazeData, player?: PlayerInfo): Coordinates => {
  if (!player) throw Error('no player info when going left!');
  const { position, canMove } = player;
  if (!canMove) return position;
  if (position[0] <= 0) return position;
  const newPosition: Coordinates = [position[0] - 1, position[1]];
  const currentCell = data.getCell(position);
  return currentCell !== undefined && currentCell.left !== 'closed' ? newPosition : position;
}

export const moveUp = (data: MazeData, player?: PlayerInfo): Coordinates => {
  if (!player) throw Error('no player info when going up!');
  const { position, canMove } = player;
  if (!canMove) return position;
  if (position[1] <= 0) return position;
  const newPosition: Coordinates = [position[0], position[1] - 1];
  const currentCell = data.getCell(position);
  return currentCell !== undefined && currentCell.top !== 'closed' ? newPosition : position;
}

export const moveDown = (data: MazeData, player?: PlayerInfo): Coordinates => {
  if (!player) throw Error('no player info when going down!');
  const { position, canMove } = player;
  if (!canMove) return position;
  if (!data.getCell([position[0], position[1] + 2])) return position;
  const newPosition: Coordinates = [position[0], position[1] + 1];
  const bottomCell = data.getCell(newPosition);
  return bottomCell !== undefined && bottomCell.top !== 'closed' ? newPosition : position;
}

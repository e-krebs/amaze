import { Position } from "../../interfaces";

export const positionClass: Record<Position, string> = {
  center: 'absolute left-1/4 top-1/4',
  north: 'absolute left-1/4 -top-1/4',
  east: 'absolute top-1/4 -right-1/4',
  south: 'absolute left-1/4 -bottom-1/4',
  west: 'absolute top-1/4 -left-1/4',
};

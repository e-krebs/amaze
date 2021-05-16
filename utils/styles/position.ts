import { Position } from "../../interfaces";

export const positionClass: Record<Position, string> = {
  center: 'absolute left-1/4 top-1/4',
  top: 'absolute left-1/4 -top-1/4',
  bottom: 'absolute left-1/4 -bottom-1/4',
  left: 'absolute top-1/4 -left-1/4',
  right: 'absolute top-1/4 -right-1/4',
};

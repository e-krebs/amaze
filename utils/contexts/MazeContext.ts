import { createContext, useContext } from "react"
import { Coordinates } from "../../models/Coordinates";
import { MazeData } from "../../models/MazeData";

export type MazeInfo = {
  maze: MazeData;
  position: Coordinates | null;
  solution: Coordinates[] | null;
}

export const MazeContext = createContext<MazeInfo | null>(null);

export const useMaze = () => {
  const context = useContext(MazeContext);
  if (!context) {
    throw new Error('useMaze called outside of context provider');
  }

  return context;
}

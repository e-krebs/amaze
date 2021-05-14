import { createContext, useContext } from "react"
import { MazeData, Size } from "../../interfaces";

export type MazeInfo = {
  maze: MazeData;
  size: Size;
}

export const MazeContext = createContext<MazeInfo | null>(null);

export const useMaze = () => {
  const context = useContext(MazeContext);
  if (!context) {
    throw new Error('useMaze called outside of context provider');
  }

  return context;
}

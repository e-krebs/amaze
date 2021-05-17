import { createContext, useContext } from "react"
import { Size } from "../../interfaces";
import { MazeData } from "../../models/MazeData";

export type GameState = {
  size: Size;
  level: number;  
  currentMaze: MazeData;
  nextMaze: () => void;
}

export const GameContext = createContext<GameState | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame called outside of context provider');
  }

  return context;
}

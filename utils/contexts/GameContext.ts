import { createContext, useContext } from "react"
import { Size } from "../../interfaces";
import { MazeData } from "../../models/MazeData";

export type GameState = {
  size: Size;
  hasWon: boolean;
  setHasWon: (state: boolean) => void;
  mazeList: MazeData[];
  mazeIndex: number;
  setMazeIndex: (index: number) => void;
}

export const GameContext = createContext<GameState | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame called outside of context provider');
  }

  return context;
}

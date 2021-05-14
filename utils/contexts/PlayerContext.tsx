import { createContext, useContext } from "react"
import { Coordinates } from "../../interfaces";

export type PlayerInfo = {
  position: Coordinates;
  canMove: boolean;
}

export const PlayerContext = createContext<PlayerInfo | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer called outside of context provider');
  }

  return context;
}

import cx from 'classnames';
import React from "react";
import { useGame } from '../utils/contexts/GameContext';
import { usePlayer } from "../utils/contexts/PlayerContext";
import { Button } from './Button';
import { Card, CardProps } from "./Card";

export const DebugCard = (props: CardProps) => {
  const { canMove, position } = usePlayer();
  const { mazeIndex, hasWon, mazeList, setMazeIndex, size } = useGame();

  return (
    <Card className="order-3 lg:self-start w-full lg:w-80" {...props}>
      <h3 className="text-lg font-semibold">{'<'}debug info{'>'}</h3>
      <div>size: {size}</div>
      <div>position: {position[0]},{position[1]}</div>
      <div className={cx(canMove ? 'text-green-500' : 'text-red-500')}>
        can move: {canMove ? 'yes' : 'NO'}
      </div>
      <div className={cx(hasWon ? 'text-green-500' : 'text-red-500')}>
        has won: {hasWon ? 'yes' : 'NO'}
      </div>
      <div>maze {mazeIndex + 1} of {mazeList.length}</div>

      <div className="flex space-x-2 mt-2">
        <Button
          onPress={() => setMazeIndex(mazeIndex - 1)}
          disabled={mazeIndex <= 0}
        >
          ← previous maze
        </Button>
        <Button
          onPress={() => setMazeIndex(mazeIndex + 1)}
          disabled={mazeIndex >= mazeList.length - 1}
        >
          next maze →
        </Button>
      </div>
    </Card>
  );
};

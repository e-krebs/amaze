import cx from 'classnames';
import React from "react";
import { useGame } from '../utils/contexts/GameContext';
import { useMaze } from '../utils/contexts/MazeContext';
import { Button } from './Button';
import { Card, CardProps } from "./Card";

export const DebugCard = ({ className, ...props }: CardProps) => {
  const { level, nextMaze, size } = useGame();
  const { position, maze, solution } = useMaze();

  return (
    <Card className={cx('space-y-3', className)} {...props}>
      <div className="text-lg font-semibold text-center">{'<'}debug info{'>'}</div>
      <div className="grid grid-cols-2 items-center justify-items-center">
        <span className="m-2">level {level}</span>
        <Button className="m-2" onPress={nextMaze}>next maze →</Button>
        <div className="m-2 grid grid-cols-3 grid-rows-3 w-20 h-20 text-center border border-gray-400 rounded-full">
          <div className="row-start-1 col-start-2">
            {maze.isNorthOpen(position, false) && '↑'}
          </div>
          <div className="row-start-2 col-start-1">
            {maze.isWestOpen(position, false) && '←'}
          </div>
          <div className="row-start-2 col-start-2">{position?.toString()}</div>
          <div className="row-start-2 col-start-3">
            {maze.isEastOpen(position, false) && '→'}
          </div>
          <div className="row-start-3 col-start-2">
            {maze.isSouthOpen(position, false) && '↓'}
          </div>
        </div>
        <div className="m-2">
          <div>size: {size}</div>
          <div>entry: {maze.entry.toString()}</div>
          <div>exits: {maze.exits.map(x => x.toString()).reduce((x, y) => `${x} - ${y}`)}</div>
        </div>
        <div className="col-span-2 text-center grid grid-cols-2 gap-x-3 gap-y-1">
          {solution && (
            solution.map((step, key) => (
              <div key={key}>{step.toString()}</div>
            ))
          )}
        </div>
      </div>
      <div className="text-lg font-semibold text-center">{'</ '}debug info{'>'}</div>
    </Card>
  );
};

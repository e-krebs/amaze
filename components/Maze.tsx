import cx from 'classnames';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Coordinates } from '../models/Coordinates';
import { MazeData } from '../models/MazeData';
import { useGame } from '../utils/contexts/GameContext';
import { MazeContext } from '../utils/contexts/MazeContext';
import { gridCols } from '../utils/styles/cols';
import { Card } from './Card';
import { Cell } from './Cell';
import { DebugCard } from './DebugCard';
import { KeyCap } from './KeyCap';

export const Maze = () => {
  const { currentMaze, nextMaze } = useGame();
  const maze = useRef<MazeData>(currentMaze);
  maze.current = currentMaze;

  const [position, setPosition] = useState<Coordinates | null>(currentMaze.entry);
  const currentPos = useRef<Coordinates | null>(null);
  currentPos.current = position;

  const [solution, setSolution] = useState<Coordinates[] | null>(null);

  const moveNorth = () => setPosition(position => maze.current.moveNorth(position));
  const moveEast = () => setPosition(position => maze.current.moveEast(position));
  const moveSouth = () => setPosition(position => maze.current.moveSouth(position));
  const moveWest = () => setPosition(position => maze.current.moveWest(position));
  const restart = () => {
    setSolution(null);
    setPosition(maze.current.entry);
  };
  const updateSolution = () => setSolution(maze.current.getSolution(currentPos.current));

  useHotkeys('R', restart);
  useHotkeys('S', updateSolution);
  useHotkeys('up', moveNorth);
  useHotkeys('right', moveEast);
  useHotkeys('down', moveSouth);
  useHotkeys('left', moveWest);

  useEffect(() => {
    if (position === null) {
      nextMaze();
    }
    if (solution !== null) {
      updateSolution();
    }
  }, [position]);

  useEffect(restart, [currentMaze]);

  return (
    <MazeContext.Provider value={{ maze: currentMaze, position, solution }}>
      <div className="flex flex-col items-center w-full lg:w-auto lg:grid lg:grid-cols-2 lg:grid-rows-3">
        <Card
          className="order-2 lg:order-1 lg:row-span-3 lg:self-start p-0 w-full lg:w-auto"
          fullBleed={true}
        >
          <div
            className={cx(
              'inline-grid grid-flow-row auto-cols-min pt-16 pl-16 pb-0 pr-0',
              gridCols[currentMaze.nbCols]
            )}
          >
            {currentMaze.grid.map((line, y) => (
              <Fragment key={y}>
                {line.map((_, x) => (
                  <Cell
                    key={x}
                    coordinates={Coordinates.fromArray([x, y])}
                    solution={solution}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </Card>
        <Card className="lg:self-start order-1 lg:order-2 w-full lg:w-80 block space-y-6">
          <div className="space-y-3">
            <h2>Press keys to move</h2>
            <div className="grid grid-cols-3 grid-rows-2 gap-2 w-max">
              <KeyCap
                keyCode="↑"
                onClick={moveNorth}
                className="row-start-1 col-start-2 w-8 h-8"
              />
              <KeyCap
                keyCode="←"
                onClick={moveWest}
                className="row-start-2 col-start-1 w-8 h-8"
              />
              <KeyCap
                keyCode="↓"
                onClick={moveSouth}
                className="row-start-2 col-start-2 w-8 h-8"
              />
              <KeyCap
                keyCode="→"
                onClick={moveEast}
                className="row-start-2 col-start-3 w-8 h-8"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <span>Press</span>
            <KeyCap
              keyCode="r"
              onClick={restart}
              className="w-7 h-7"
            />
            <span>to restart the current level</span>
          </div>
          <div className="flex space-x-2">
            <span>Press</span>
            <KeyCap
              keyCode="s"
              onClick={updateSolution}
              className="w-7 h-7"
            />
            <span>to see a solution</span>
          </div>
        </Card>
        <DebugCard className="lg:row-span-2 order-3 lg:self-start w-full lg:w-80" />
      </div>
    </MazeContext.Provider>
  );
}

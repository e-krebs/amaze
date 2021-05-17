import cx from 'classnames';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { isOneOfCells } from '../utils/cell';
import { useGame } from '../utils/contexts/GameContext';
import { MazeContext } from '../utils/contexts/MazeContext';
import { PlayerContext, PlayerInfo } from '../utils/contexts/PlayerContext';
import { moveLeft, moveRight, moveUp, moveDown } from '../utils/player';
import { Cols, gridCols } from '../utils/styles/cols';
import { Card } from './Card';
import { Cell } from './Cell';
import { DebugCard } from './DebugCard';
import { KeyCap } from './KeyCap';

export const Maze = () => {
  const { mazeIndex, mazeList, setMazeIndex, setHasWon } = useGame();
  const maze = mazeList[mazeIndex];

  let index = useRef<number>();
  index.current = mazeIndex;

  const nextMaze = useCallback(() => {
    if (index.current! < mazeList.length - 1) {
      setMazeIndex(index.current! + 1);
    } else {
      setHasWon(true);
    }
  }, []);

  const [position, setPosition] = useState(maze.entry);
  const [canMove, setCanMove] = useState(true);

  let player = useRef<PlayerInfo>();
  player.current = { position, canMove };

  const restart = useCallback(() => {
    setPosition(maze.entry);
    setCanMove(true);
  }, [maze]);

  useEffect(restart, [maze]);

  const goRight = useCallback(() => setPosition(moveRight(maze, player.current)), [maze]);
  const goLeft = useCallback(() => setPosition(moveLeft(maze, player.current)), [maze]);
  const goUp = useCallback(() => setPosition(moveUp(maze, player.current)), [maze]);
  const goDown = useCallback(() => setPosition(moveDown(maze, player.current)), [maze]);

  useHotkeys('right', goRight);
  useHotkeys('left', goLeft);
  useHotkeys('up', goUp);
  useHotkeys('down', goDown);
  useHotkeys('R', restart);

  useEffect(() => {
    if (isOneOfCells(maze.exits, ...position)) {
      setCanMove(false);
      nextMaze();
    }
  }, [position]);

  const cols = useMemo(() => {
    const nbCols = Math.max(0, ...maze.grid.map(line => line.length));
    return Math.min(nbCols, 12) as Cols;
  }, [maze]);

  return (
    <MazeContext.Provider value={{ maze, nextMaze }}>
      <PlayerContext.Provider value={{ position, canMove }}>
        <div className="flex flex-col items-center lg:grid lg:grid-cols-2 lg:grid-rows-3">
          <Card className="order-2 lg:order-1 lg:row-span-3 lg:self-start p-0 w-full lg:w-auto" fullBleed={true}>
            <div className={cx('inline-grid grid-flow-row auto-cols-min pt-16 pl-16 pb-0 pr-0', gridCols[cols])}>
              {maze.grid.map((line, y) => (
                <Fragment key={y}>
                  {line.map((_, x) => (
                    <Cell key={x} coordinates={[x, y]} />
                  ))}
                </Fragment>
              ))}
            </div>
          </Card>
          <Card className="lg:self-start order-1 lg:order-2 w-full lg:w-80 block space-y-6">
            <div className="space-y-3">
              <h2>Press keys to move</h2>
              <div className="grid grid-cols-3 grid-rows-2 gap-2 w-max">
                <KeyCap keyCode="↑" onClick={goUp} className="row-start-1 col-start-2 w-8 h-8" />
                <KeyCap keyCode="←" onClick={goLeft} className="row-start-2 col-start-1 w-8 h-8" />
                <KeyCap keyCode="↓" onClick={goDown} className="row-start-2 col-start-2 w-8 h-8" />
                <KeyCap keyCode="→" onClick={goRight} className="row-start-2 col-start-3 w-8 h-8" />
              </div>
            </div>
            <div className="flex space-x-2">
              <span>Press</span>
              <KeyCap keyCode="r" onClick={restart} className="w-7 h-7" />
              <span>to restart the current level</span>
            </div>
          </Card>
          <DebugCard className="lg:row-span-2 order-3 lg:self-start w-full lg:w-80" />
        </div>
      </PlayerContext.Provider>
    </MazeContext.Provider>
  );
}

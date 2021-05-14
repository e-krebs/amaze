import cx from 'classnames';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { MazeData } from '../interfaces';
import { getEntryCoordinates, isOneOfCells } from '../utils/cell';
import { MazeContext } from '../utils/contexts/MazeContext';
import { PlayerContext, PlayerInfo } from '../utils/contexts/PlayerContext';
import { moveLeft, moveRight, moveUp, moveDown } from '../utils/player';
import { Cell } from './Cell';

type Props = { maze: MazeData };

export const Maze = ({ maze }: Props) => {
  const [position, setPosition] = useState(getEntryCoordinates(maze));
  const [canMove, setCanMove] = useState(true);

  let player = useRef<PlayerInfo>();
  player.current = { position, canMove };

  useHotkeys('right', () => setPosition(moveRight(maze, player.current)));
  useHotkeys('left', () => setPosition(moveLeft(maze, player.current)));
  useHotkeys('up', () => setPosition(moveUp(maze, player.current)));
  useHotkeys('down', () => setPosition(moveDown(maze, player.current)));
  useHotkeys('r', () => {
    setPosition(getEntryCoordinates(maze));
    setCanMove(true);
  });

  useEffect(() => {
    if (isOneOfCells(maze.exits, ...position)) {
      setCanMove(false);
    }
  }, [position]);

  return (
    <PlayerContext.Provider value={{ position, canMove }}>
      <MazeContext.Provider value={{ maze, size: "XL" }}>
        <div className="flex flex-col lg:flex-row">
          <section className="order-2 lg:order-1">
            <div className="inline-grid grid-flow-row auto-cols-min grid-cols-12">
              {maze.grid.map((line, y) => (
                <Fragment key={y}>
                  {line.map((_, x) => (
                    <Cell key={x} coordinates={[x, y]} />
                  ))}
                </Fragment>
              ))}
            </div>
          </section>
          <section className="order-1 lg:order-2 py-8 lg:pl-8 lg:py-0">
            <div
              className={cx(player.current.canMove ? 'text-green-400' : 'text-red-400')}
            >
              can move: {player.current.canMove ? 'yes' : 'NO'}
            </div>
          </section>
        </div>
      </MazeContext.Provider>
    </PlayerContext.Provider>
  );
}

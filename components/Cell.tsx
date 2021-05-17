import ArrowPointingNorth from '../static/arrow-pointing-north.svg';
import ArrowPointingEast from '../static/arrow-pointing-east.svg';
import ArrowPointingSouth from '../static/arrow-pointing-south.svg';
import ArrowPointingWest from '../static/arrow-pointing-west.svg';
import Player from '../static/player.svg';

import cx from 'classnames';
import { useMaze } from '../utils/contexts/MazeContext';
import { useGame } from '../utils/contexts/GameContext';
import { sizeClass } from '../utils/styles/size';
import { positionClass } from '../utils/styles/position';
import { Coordinates } from '../models/Coordinates';

type Props = { coordinates: Coordinates };

export const Cell = ({ coordinates }: Props) => {
  const { maze, position } = useMaze();
  const { size } = useGame();

  const entry = maze.getEntryDirections(coordinates);
  const exit = maze.getExitDirections(coordinates);

  return (
    <div
      className={cx(
        'relative border-black',
        sizeClass[size].width,
        sizeClass[size].height,
        maze.isLastWest(coordinates) && 'col-start-1',
        maze.isNorthClosed(coordinates) && 'border-t',
        maze.isWestClosed(coordinates) && 'border-l',
        entry.isOpen && 'bg-yellow-400',
        exit.isOpen && 'bg-green-400'
      )}
      title={`${coordinates.x},${coordinates.y}`}
    >
      {entry.north && <ArrowPointingSouth className={positionClass.north} />}
      {entry.east && <ArrowPointingWest className={positionClass.east} />}
      {entry.south && <ArrowPointingNorth className={positionClass.south} />}
      {entry.west && <ArrowPointingEast className={positionClass.west} />}

      {exit.north && <ArrowPointingNorth className={positionClass.north} />}
      {exit.east && <ArrowPointingEast className={positionClass.east} />}
      {exit.south && <ArrowPointingSouth className={positionClass.south} />}
      {exit.west && <ArrowPointingWest className={positionClass.west} />}

      {coordinates.isCell(position) && <Player className={positionClass.center} />}
    </div>
  );
};

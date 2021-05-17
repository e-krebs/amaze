import ArrowRight from '../static/arrow_right.svg';
import ArrowLeft from '../static/arrow_left.svg';
import ArrowBottom from '../static/arrow_bottom.svg';
import ArrowTop from '../static/arrow_top.svg';
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
      {entry.north && <ArrowBottom className={positionClass.north} />}
      {entry.east && <ArrowLeft className={positionClass.east} />}
      {entry.south && <ArrowTop className={positionClass.south} />}
      {entry.west && <ArrowRight className={positionClass.west} />}

      {exit.north && <ArrowTop className={positionClass.north} />}
      {exit.east && <ArrowRight className={positionClass.east} />}
      {exit.south && <ArrowBottom className={positionClass.south} />}
      {exit.west && <ArrowLeft className={positionClass.west} />}

      {coordinates.isCell(position) && <Player className={positionClass.center} />}
    </div>
  );
};

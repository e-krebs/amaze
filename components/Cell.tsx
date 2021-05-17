import cx from 'classnames';
import { Coordinates } from "../interfaces";
import ArrowRight from '../static/arrow_right.svg';
import ArrowLeft from '../static/arrow_left.svg';
import ArrowBottom from '../static/arrow_bottom.svg';
import ArrowTop from '../static/arrow_top.svg';
import Player from '../static/player.svg';

import { getCell, getEntryDirections, getExitDirections, isCell } from '../utils/cell';
import { usePlayer } from '../utils/contexts/PlayerContext';
import { useMaze } from '../utils/contexts/MazeContext';
import { sizeClass } from '../utils/styles/size';
import { positionClass } from '../utils/styles/position';
import { useGame } from '../utils/contexts/GameContext';

type Props = { coordinates: Coordinates };

export const Cell = ({ coordinates }: Props) => {
  const { maze } = useMaze();
  const { size } = useGame();
  const { position } = usePlayer();
  const cell = getCell(maze, coordinates);
  const entryInfo = getEntryDirections(maze, coordinates);
  const exitInfo = getExitDirections(maze, coordinates);
  const isPlayer = isCell(position, coordinates);

  return (
    <div
      data-cell={JSON.stringify(cell)}
      className={cx(
        'relative border-black',
        sizeClass[size].width,
        sizeClass[size].height,
        coordinates[0] === 0 && 'col-start-1',
        cell?.top === 'closed' && 'border-t',
        cell?.left === 'closed' && 'border-l',
        (entryInfo.top || entryInfo.bottom || entryInfo.left || entryInfo.right) && 'bg-yellow-400',
        (exitInfo.top || exitInfo.bottom || exitInfo.left || exitInfo.right) && 'bg-green-400'
      )}
      title={`${coordinates[0]},${coordinates[1]}`}
    >
      {entryInfo.top && <ArrowBottom className={positionClass.top} />}
      {entryInfo.bottom && <ArrowTop className={positionClass.bottom} />}
      {entryInfo.left && <ArrowRight className={positionClass.left} />}
      {entryInfo.right && <ArrowLeft className={positionClass.right} />}

      {exitInfo.top && <ArrowTop className={positionClass.top} />}
      {exitInfo.bottom && <ArrowBottom className={positionClass.bottom} />}
      {exitInfo.left && <ArrowLeft className={positionClass.left} />}
      {exitInfo.right && <ArrowRight className={positionClass.right} />}

      {isPlayer && <Player className={positionClass.center} />}
    </div>
  );
};

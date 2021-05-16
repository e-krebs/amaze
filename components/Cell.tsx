import cx from 'classnames';
import { Coordinates } from "../interfaces";
import arrowRight from '../public/arrow_right.svg';
import arrowLeft from '../public/arrow_left.svg';
import arrowBottom from '../public/arrow_bottom.svg';
import arrowTop from '../public/arrow_top.svg';
import player from '../public/player.svg';

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

  const itemClass = sizeClass[size].item;

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
      {entryInfo.top && (
        <img className={cx(positionClass.top, itemClass)} src={arrowBottom} alt="" />
      )}
      {entryInfo.bottom && (
        <img className={cx(positionClass.bottom, itemClass)} src={arrowTop} alt="" />
      )}
      {entryInfo.left && (
        <img className={cx(positionClass.left, itemClass)} src={arrowRight} alt="" />
      )}
      {entryInfo.right && (
        <img className={cx(positionClass.right, itemClass)} src={arrowLeft} alt="" />
      )}

      {exitInfo.top && (
        <img className={cx(positionClass.top, itemClass)} src={arrowTop} alt="" />
      )}
      {exitInfo.bottom && (
        <img className={cx(positionClass.bottom, itemClass)} src={arrowBottom} alt="" />
      )}
      {exitInfo.left && (
        <img className={cx(positionClass.left, itemClass)} src={arrowLeft} alt="" />
      )}
      {exitInfo.right && (
        <img className={cx(positionClass.right, itemClass)} src={arrowRight} alt="" />
      )}

      {isPlayer && (
        <img className={cx(positionClass.center, itemClass)} src={player} alt="" />
      )}
    </div>
  )
}

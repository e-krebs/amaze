import cx from 'classnames';
import { Coordinates, Size } from "../interfaces";
import arrowRight from '../public/arrow_right.svg';
import arrowBottom from '../public/arrow_bottom.svg';
import player from '../public/player.svg';

import { getCell, getEntryDirections, getExitDirections, isCell } from '../utils/cell';
import { usePlayer } from '../utils/contexts/PlayerContext';
import { useMaze } from '../utils/contexts/MazeContext';

type Props = { coordinates: Coordinates };

const sizeClass: Record<Size, { width: string, height: string, item: string }> = {
  S: { width: 'w-4', height: 'h-4', item: 'w-2' },
  M: { width: 'w-8', height: 'h-8', item: 'w-4' },
  L: { width: 'w-12', height: 'h-12', item: 'w-6' },
  XL: { width: 'w-16', height: 'h-16', item: 'w-8' }
}

export const Cell = ({ coordinates }: Props) => {
  const { maze, size } = useMaze();
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
        (entryInfo.left || entryInfo.top) && 'bg-yellow-400',
        (exitInfo.right || exitInfo.bottom) && 'bg-green-400'
      )}
      title={`${coordinates[0]},${coordinates[1]}`}
    >
      {entryInfo.left && (
        <img
          className={cx('absolute -left-1/4 top-1/4', sizeClass[size].item)}
          src={arrowRight}
        />
      )}
      {entryInfo.top && (
        <img
          className={cx('absolute -top-1/4 left-1/4', sizeClass[size].item)}
          src={arrowBottom}
        />
      )}
      {exitInfo.right && (
        <img
          className={cx('absolute -right-1/4 top-1/4', sizeClass[size].item)}
          src={arrowRight}
        />
      )}
      {exitInfo.bottom && (
        <img
          className={cx('absolute -bottom-1/4 left-1/4', sizeClass[size].item)}
          src={arrowBottom}
        />
      )}
      {isPlayer && (
        <img
          className={cx('absolute top-1/4 left-1/4', sizeClass[size].item)}
          src={player}
        />
      )}
    </div>
  )
}

import cx from 'classnames';
import { HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLButtonElement> & { keyCode: string };

export const KeyCap = ({ keyCode, className, onClick }: Props) => (
  <button
    onClick={onClick}
    className={cx(
      'flex items-center justify-center capitalize border border-gray-600 bg-gray-400 rounded px-2 cursor-pointer shadow-md focus:outline-none',
      keyCode.length <= 1 && 'text-base',
      keyCode.length == 2 && 'text-sm',
      keyCode.length >= 3 && 'text-xs',
      className,
    )}
  >
    <div>{keyCode}</div>
  </button>
);

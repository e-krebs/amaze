import cx from 'classnames';
import { HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLButtonElement> & { keyCode: string };

export const KeyCap = ({ keyCode, className, onClick }: Props) => (
  <button
    onClick={onClick}
    className={cx(
      'flex items-center justify-center uppercase border border-gray-600 bg-gray-400 rounded px-2 cursor-pointer shadow-md focus:outline-none',
      className,
    )}
  >
    <div>{keyCode}</div>
  </button>
);

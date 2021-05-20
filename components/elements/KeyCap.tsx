import cx from 'classnames';
import { HTMLAttributes, MouseEventHandler } from "react";
import Link from 'next/link';
import { UrlObject } from 'url';

export type Props = HTMLAttributes<HTMLButtonElement> & {
  keyCode: string;
  href?: string | UrlObject;
} & ({
  href: string | UrlObject
} | {
  onClick: MouseEventHandler<HTMLButtonElement>
});

export const KeyCap = ({ keyCode, className, onClick, href }: Props) => {
  const classes = cx(
    'flex items-center justify-center capitalize border border-gray-600 bg-gray-400 rounded px-2 cursor-pointer shadow-md focus:outline-none',
    keyCode.length <= 1 && 'text-base',
    keyCode.length == 2 && 'text-sm',
    keyCode.length >= 3 && 'text-xs',
    className,
  );

  return href ? (
    <Link href={href}>
      <a className={classes}>{keyCode}</a>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={classes}
    >
      <div>{keyCode}</div>
    </button>
  );

}
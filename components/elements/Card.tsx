import cx from 'classnames';
import { FC, HtmlHTMLAttributes } from "react";

export type CardProps = HtmlHTMLAttributes<HTMLElement> & {
  fullBleed?: boolean;
  width?: string;
};

export const Card: FC<CardProps> = ({
  fullBleed = false,
  width = 'w-full lg:w-auto',
  className,
  children
}) => (
  <section
    className={cx(
      width,
      'shadow-lg rounded m-3 bg-white',
      !fullBleed && 'p-6',
      className
    )}
  >
    {children}
  </section>
);

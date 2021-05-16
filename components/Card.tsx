import cx from 'classnames';
import { FC, HtmlHTMLAttributes } from "react";

export type CardProps = HtmlHTMLAttributes<HTMLElement> & {
  fullBleed?: boolean;
};

export const Card: FC<CardProps> = ({
  fullBleed = false,
  className,
  children
}) => (
  <section
    className={cx(
      'shadow-lg rounded m-3 bg-white',
      !fullBleed && 'p-6',
      className
    )}
  >
    {children}
  </section>
);

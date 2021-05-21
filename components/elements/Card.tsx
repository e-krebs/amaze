import cx from 'classnames';
import { forwardRef, HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLElement> & {
  fullBleed?: boolean;
  width?: string;
};

export const Card = forwardRef<HTMLElement, CardProps>(({
  fullBleed = false,
  width = 'w-full lg:w-auto',
  className,
  children,
  ...props
}, ref) => (
  <section
    {...props}
    ref={ref}
    className={cx(
      width,
      'shadow-lg rounded m-3 bg-white',
      !fullBleed && 'p-6',
      className
    )}
  >
    {children}
  </section>
));

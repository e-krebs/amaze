import cx from "classnames";
import { AnchorHTMLAttributes, FC } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>;

export const ExternalLink: FC<Props> = ({
  href,
  className,
  children,
  ...props
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className={cx('text-pink-500 hover:underline', className)}
    {...props}
  >
    {children}
  </a>
);

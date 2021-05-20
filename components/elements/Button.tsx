import { useButton } from '@react-aria/button';
import { AriaButtonProps } from "@react-types/button";
import cx from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, useRef } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & AriaButtonProps<'button'>;

export const buttonClassName = (disabled: boolean = false) => cx('border rounded bg-white border-gray-400 px-2 py-1 focus:outline-none', disabled && 'opacity-50');

export const Button = ({ className, disabled, children, ...props }: Props) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  
  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={cx(buttonClassName(disabled), className)}
    >
      {children}
    </button>
  );
};


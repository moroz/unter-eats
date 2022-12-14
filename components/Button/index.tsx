import clsx from "clsx";
import Link from "next/link";
import React from "react";
import styles from "./Button.module.sass";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit";
  href?: string;
}

const Button: React.FC<Props> = ({
  href,
  children,
  onClick,
  className,
  type = "button",
  disabled,
  ...rest
}) => {
  const classes = clsx(styles.root, className);

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

import LogoImage from "./artesano_logo.svg";
import React from "react";
import clsx from "clsx";
import styles from "./Logo.module.sass";

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return <LogoImage className={clsx(styles.logo, className)} />;
};

export default Logo;

import React from "react";
import styles from "./Footer.module.sass";

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className={styles.footer}>
      <p>Hello world!</p>
    </footer>
  );
};

export default Footer;

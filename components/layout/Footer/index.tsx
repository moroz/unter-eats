import { PaymentLogos } from "@components";
import React from "react";
import styles from "./Footer.module.sass";

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2022 Artesano &amp;{" "}
        <a href="https://moroz.dev" target="_blank" rel="noopener noreferrer">
          Karol Moroz
        </a>
        . All rights reserved.
      </p>
      <PaymentLogos />
    </footer>
  );
};

export default Footer;

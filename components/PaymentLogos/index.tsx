import React from "react";
import styles from "./PaymentLogos.module.sass";
import BlikLogo from "./blik.svg";
import VisaLogo from "./visa.svg";
import McLogo from "./mc.svg";

interface Props {}

const PaymentLogos: React.FC<Props> = () => {
  return (
    <div className={styles.root}>
      <BlikLogo />
      <div className={styles.visa}>
        <VisaLogo />
      </div>
      <McLogo />
    </div>
  );
};

export default PaymentLogos;

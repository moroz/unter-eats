import React from "react";
import styles from "./PaymentLogos.module.sass";
import BlikLogo from "./blik.svg";
import VisaLogo from "./visa.svg";
import McLogo from "./mc.svg";
import GooglePayLogo from "./gpay.svg";
import ApplePayLogo from "./apple.svg";
import PrzelewyLogo from "./p24.svg";
import clsx from "clsx";

interface Props {
  className?: string;
}

const PaymentLogos: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <BlikLogo />
      <div className={styles.visa}>
        <VisaLogo />
      </div>
      <McLogo />
      <div className={styles.gpay}>
        <GooglePayLogo />
      </div>
      <div className={styles.apple}>
        <ApplePayLogo />
      </div>
      <div className={styles.p24}>
        <PrzelewyLogo />
      </div>
    </div>
  );
};

export default PaymentLogos;

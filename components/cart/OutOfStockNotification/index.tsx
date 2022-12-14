import Button from "@components/Button";
import React from "react";
import styles from "./OutOfStockNotification.module.sass";

interface Props {
  onConfirm: VoidFunction;
}

const OutOfStockNotification: React.FC<Props> = ({ onConfirm }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Niektóre z wybranych produktów są obecnie niedostępne. Aby złożyć
        zamówienie, usuń je z koszyka.
      </p>
      <Button onClick={onConfirm}>Usuń niedostępne produkty</Button>
    </div>
  );
};

export default OutOfStockNotification;

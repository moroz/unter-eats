import React from "react";
import styles from "./CartButton.module.sass";
import Basket from "./bag-shopping.svg";
import useCart from "@/hooks/useCart";
import clsx from "clsx";

interface Props {
  className?: string;
}

const CartButton: React.FC<Props> = ({ className }) => {
  const { items, toggleCart } = useCart();

  return (
    <button className={clsx(styles.button, className)} onClick={toggleCart}>
      <Basket />
      <span className={styles.label}>
        Koszyk{items.length ? ` (${items.length})` : null}
      </span>
    </button>
  );
};

export default CartButton;

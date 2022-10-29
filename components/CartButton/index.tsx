import React from "react";
import styles from "./CartButton.module.sass";
import Basket from "./basket-shopping.svg";
import useCart from "@/hooks/useCart";

interface Props {}

const CartButton: React.FC<Props> = () => {
  const { items, toggleCart } = useCart();

  return (
    <button className={styles.button} onClick={toggleCart}>
      <Basket />
      <span>Koszyk{items.length ? ` (${items.length})` : null}</span>
    </button>
  );
};

export default CartButton;

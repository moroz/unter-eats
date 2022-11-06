import React, { useCallback } from "react";
import styles from "./CartButton.module.sass";
import Basket from "./bag-shopping.svg";
import useCart from "@/hooks/useCart";
import clsx from "clsx";

interface Props {
  className?: string;
  closeMenu: VoidFunction;
}

const CartButton: React.FC<Props> = ({ className, closeMenu }) => {
  const { items, toggleCart } = useCart();

  const onToggle = useCallback(() => {
    toggleCart();
    closeMenu();
  }, [closeMenu, toggleCart]);

  return (
    <button
      className={clsx(
        styles.button,
        className,
        items.length && styles.hasItems
      )}
      onClick={onToggle}
    >
      <Basket />
      {items.length ? (
        <span className={styles.count}>{items.length}</span>
      ) : null}
      <span className={styles.label}>
        Koszyk{items.length ? ` (${items.length})` : null}
      </span>
    </button>
  );
};

export default CartButton;

import Button from "@components/Button";
import useCart from "@hooks/useCart";
import React from "react";
import styles from "./CartEmpty.module.sass";

interface Props {}

const CartEmpty: React.FC<Props> = () => {
  const { closeCart } = useCart();

  return (
    <div className={styles.root}>
      <p>
        Twój koszyk jest pusty. Aby złożyć zamówienie, wybierz coś z naszego
        menu!
      </p>
      <Button
        href="/menu/dania-glowne"
        className={styles.button}
        onClick={closeCart}
      >
        Przejdź do menu
      </Button>
    </div>
  );
};

export default CartEmpty;

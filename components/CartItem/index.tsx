import useCart from "@hooks/useCart";
import { CartItem, Product } from "@interfaces";
import React from "react";
import styles from "./CartItem.module.sass";

interface Props {
  product: Product;
  cartItem: CartItem;
}

const CartItem: React.FC<Props> = ({ product, cartItem }) => {
  const { removeItem, changeItemQuantity } = useCart();

  return (
    <article className={styles.item}>
      <p className={styles.name}>{product.namePl}</p>
    </article>
  );
};

export default CartItem;

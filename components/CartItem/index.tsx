import useCart from "@hooks/useCart";
import { CartItem, Product } from "@interfaces";
import React from "react";
import ProductImage from "../ProductImage";
import styles from "./CartItem.module.sass";
import CloseIcon from "@icons/xmark.svg";

interface Props {
  product: Product;
  cartItem: CartItem;
}

const CartItem: React.FC<Props> = ({ product, cartItem }) => {
  const { removeItem, changeItemQuantity } = useCart();

  return (
    <article className={styles.item}>
      <ProductImage product={product} aspectRatio="1 / 1" showPrice={false} />
      <p className={styles.name}>{product.namePl}</p>
      <button className={styles.remove} onClick={() => removeItem(product.id)}>
        <CloseIcon /> Usuń
      </button>
    </article>
  );
};

export default CartItem;

import useCart from "@/hooks/useCart";
import { Product } from "@interfaces";
import clsx from "clsx";
import React, { useCallback } from "react";
import styles from "./AddToCartButton.module.sass";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton: React.FC<Props> = ({ product, className }) => {
  const { addItem } = useCart();

  const onClick = useCallback(() => {
    addItem(product.id);
  }, [addItem, product.id]);

  return (
    <button className={clsx(styles.cta, className)} onClick={onClick}>
      Do koszyka &bull; {product.price} zł
    </button>
  );
};

export default AddToCartButton;

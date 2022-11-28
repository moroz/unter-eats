import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/priceHelpers";
import { Product } from "@interfaces";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import Button from "../Button";
import styles from "./AddToCartButton.module.sass";

interface Props {
  product: Product;
  className?: string;
}

const FADE_OUT_TIME = 2000;

const AddToCartButton: React.FC<Props> = ({ product, className }) => {
  const { addItem } = useCart();
  const [clicked, setClicked] = useState(false);

  const fadeOut = useCallback(() => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, FADE_OUT_TIME);
  }, [setClicked]);

  const onClick = useCallback(() => {
    addItem(product.id);
    fadeOut();
  }, [addItem, product.id, fadeOut]);

  return (
    <Button
      onClick={onClick}
      disabled={!product.inStock}
      className={clsx(
        styles.cta,
        clicked && styles.clicked,
        className,
        !product.inStock && styles.soldOut
      )}
    >
      {product.inStock ? (
        <>
          <span className={styles.baseText}>
            Do koszyka · {formatPrice(product.price)}
          </span>
          <span className={styles.clickedText}>Dodano do koszyka!</span>
        </>
      ) : (
        <span>Chwilowo niedostępne</span>
      )}
    </Button>
  );
};

export default AddToCartButton;

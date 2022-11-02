import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/priceHelpers";
import { Product } from "@interfaces";
import clsx from "clsx";
import React, { useCallback } from "react";
import Button from "../Button";
import styles from "./AddToCartButton.module.sass";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton: React.FC<Props> = ({ product, className }) => {
  const { addItem } = useCart();

  // TODO: Add effect when item added to cart

  const onClick = useCallback(() => {
    addItem(product.id);
  }, [addItem, product.id]);

  return (
    <Button onClick={onClick} className={clsx(styles.cta, className)}>
      Do koszyka · {formatPrice(product.price)}
    </Button>
  );
};

export default AddToCartButton;

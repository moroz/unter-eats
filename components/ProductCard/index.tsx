import { Product } from "@interfaces";
import React from "react";
import styles from "./ProductCard.module.sass";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.name}>{product.namePl}</h2>
      <p>{product.descriptionPl}</p>
      <button className={styles.cta}>
        Do koszyka &bull; {product.price} zł
      </button>
    </article>
  );
};

export default ProductCard;

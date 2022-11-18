import { Category, Product } from "@interfaces";
import React from "react";
import AddToCartButton from "../AddToCartButton";
import ProductImage from "../ProductImage";
import styles from "./ProductCard.module.sass";

interface Props {
  product: Product;
  category: Category;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <ProductImage product={product} />
      <span className={styles.name}>{product.namePl}</span>
      <div className={styles.description}>{product.descriptionPl}</div>
      <AddToCartButton product={product} />
    </article>
  );
};

export default ProductCard;

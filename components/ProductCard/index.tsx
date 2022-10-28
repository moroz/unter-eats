import { Product } from "@interfaces";
import Link from "next/link";
import React from "react";
import ProductImage from "../ProductImage";
import styles from "./ProductCard.module.sass";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const url = `/menu/product/${product.slug}`;
  return (
    <article className={styles.card}>
      <Link href={url}>
        <ProductImage />
      </Link>
      <Link href={url} className={styles.name}>
        {product.namePl}
      </Link>
      <p>{product.descriptionPl}</p>
      <button className={styles.cta}>
        Do koszyka &bull; {product.price} zł
      </button>
    </article>
  );
};

export default ProductCard;

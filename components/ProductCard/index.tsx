import { Category, Product } from "@interfaces";
import Link from "next/link";
import React from "react";
import AddToCartButton from "../AddToCartButton";
import ProductImage from "../ProductImage";
import styles from "./ProductCard.module.sass";

interface Props {
  product: Product;
  category: Category;
}

const ProductCard: React.FC<Props> = ({ product, category }) => {
  const referer = category
    ? new URLSearchParams({ ref: category?.slug }).toString()
    : "";
  const url = `/menu/product/${product.slug}?${referer}`;
  return (
    <article className={styles.card}>
      <Link href={url}>
        <ProductImage product={product} />
      </Link>
      <Link href={url} className={styles.name}>
        {product.namePl}
      </Link>
      <p>{product.descriptionPl}</p>
      <AddToCartButton product={product} />
    </article>
  );
};

export default ProductCard;

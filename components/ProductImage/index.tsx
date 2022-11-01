import { Product } from "@interfaces";
import React from "react";
import styles from "./ProductImage.module.sass";
import Image from "next/image";
import biryani from "./biryani.jpg";

interface Props {
  product?: Product;
  aspectRatio?: string;
  showPrice?: boolean;
}

const ProductImage: React.FC<Props> = ({
  product,
  aspectRatio,
  showPrice = true
}) => {
  const style = aspectRatio
    ? ({ "--aspect-ratio": aspectRatio } as React.CSSProperties)
    : undefined;

  return (
    <picture className={styles.root} style={style}>
      <Image src={biryani} alt={product?.descriptionPl ?? ""} />
      {product?.price && showPrice ? (
        <span className={styles.priceLabel}>{product.price} zł</span>
      ) : null}
    </picture>
  );
};

export default ProductImage;

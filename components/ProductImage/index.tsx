import { Product } from "@interfaces";
import React from "react";
import styles from "./ProductImage.module.sass";
import Image from "next/image";

interface Props {
  product?: Product;
  aspectRatio?: string;
  showPrice?: boolean;
}

const uuid = "c84ac4ff-bec1-4389-9dbb-5b971a154e54";
const asset_host = "https://d19gk9i6dczo7b.cloudfront.net";

const ProductImage: React.FC<Props> = ({
  product,
  aspectRatio,
  showPrice = true
}) => {
  const style = aspectRatio
    ? ({ "--aspect-ratio": aspectRatio } as React.CSSProperties)
    : undefined;
  const base_dir = `${asset_host}/images/${uuid.slice(0, 2)}/${uuid}`;

  return (
    <picture className={styles.root} style={style}>
      <source
        type="image/webp"
        media="(min-width: 59.25rem)"
        srcSet={`${base_dir}/thumb.webp 1x, ${base_dir}/thumb_retina.webp 2x`}
      />
      <source
        type="image/webp"
        media="(max-width: 59.1875rem)"
        srcSet={`${base_dir}/thumb_mobile.webp 1x, ${base_dir}/thumb_mobile_retina.webp 2x`}
      />
      <img src={`${base_dir}/thumb_mobile.webp`} alt="" />
      {product?.price && showPrice ? (
        <span className={styles.priceLabel}>{product.price} zł</span>
      ) : null}
    </picture>
  );
};

export default ProductImage;

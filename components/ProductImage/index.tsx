import { Product } from "@interfaces";
import clsx from "clsx";
import React from "react";
import styles from "./ProductImage.module.sass";

export enum ImageSizeEnum {
  Thumb = "thumb",
  Cart = "cart"
}

export type ImageSize = ImageSizeEnum | `${ImageSizeEnum}`;

interface Props {
  product?: Product;
  aspectRatio?: string;
  showPrice?: boolean;
  size?: ImageSize;
  inStock?: boolean;
}

const PLACEHOLDER_UUID = "f063649f-c192-44c0-8fad-5f86d032daa6";
const asset_host = process.env.NEXT_PUBLIC_ASSET_HOST;

interface SourceDefintion {
  media?: string;
  srcSet: string[];
}

const SIZE_SOURCES: Record<ImageSize, SourceDefintion[]> = {
  thumb: [
    {
      media: "(min-width: 59.25rem)",
      srcSet: ["thumb.webp 1x", "thumb_retina.webp 2x"]
    },
    {
      media: "(max-width: 59.1875rem)",
      srcSet: ["thumb_mobile.webp 1x", "thumb_mobile_retina.webp 2x"]
    }
  ],
  cart: [
    {
      srcSet: ["cart_thumb.webp 1x", "cart_thumb_retina.webp 2x"]
    }
  ]
};

const ProductImage: React.FC<Props> = React.memo(
  ({
    product,
    aspectRatio,
    showPrice = true,
    size = "thumb",
    inStock = true
  }) => {
    const uuid = product?.imageUuid ?? PLACEHOLDER_UUID;
    const style = aspectRatio
      ? ({ "--aspect-ratio": aspectRatio } as React.CSSProperties)
      : undefined;
    const base_dir = `${asset_host}/images/${uuid.slice(0, 2)}/${uuid}`;

    return (
      <picture
        className={clsx(styles.root, !inStock && styles.notInStock)}
        style={style}
      >
        {SIZE_SOURCES[size].map(({ media, srcSet }, i) => (
          <source
            key={i}
            srcSet={srcSet.map((file) => `${base_dir}/${file}`).join(", ")}
            media={media}
          />
        ))}
        <img src={`${base_dir}/thumb_mobile.webp`} alt="" />
        {product?.price && showPrice ? (
          <span className={styles.priceLabel}>{product.price} zł</span>
        ) : null}
      </picture>
    );
  }
);

export default ProductImage;

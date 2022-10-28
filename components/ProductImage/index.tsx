import { Product } from "@interfaces";
import React from "react";
import styles from "./ProductImage.module.sass";
import Image from "next/image";
import biryani from "./biryani.jpg";

interface Props {
  product?: Product;
}

const ProductImage: React.FC<Props> = ({ product }) => {
  return (
    <picture className={styles.root}>
      <Image src={biryani} alt={product?.descriptionPl ?? ""} />
    </picture>
  );
};

export default ProductImage;

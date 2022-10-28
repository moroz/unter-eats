import { Product } from "@interfaces";
import clsx from "clsx";
import React from "react";
import ProductCard from "../ProductCard";
import styles from "./ProductGrid.module.sass";

interface Props {
  products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className={clsx("container", styles.grid)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

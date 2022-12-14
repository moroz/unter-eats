import useCart from "@hooks/useCart";
import { CartItem, Product } from "@interfaces";
import React, { useCallback } from "react";
import { ProductImage } from "@components";
import styles from "./CartItem.module.sass";
import CloseIcon from "@icons/xmark.svg";
import { QuantityInput } from "@components";
import { formatPrice } from "@/lib/priceHelpers";

interface Props {
  product: Product;
  cartItem: CartItem;
}

const CartItem: React.FC<Props> = ({ product, cartItem }) => {
  const { removeItem, changeItemQuantity } = useCart();

  // TODO: Add option to revert removing item from cart
  // TODO: Notify when item becomes available?

  const onChangeQuantity = useCallback(
    (quantity: number) => {
      changeItemQuantity(product.id, quantity);
    },
    [changeItemQuantity, product.id]
  );

  return (
    <article className={styles.item}>
      <ProductImage
        product={product}
        aspectRatio="1 / 1"
        showPrice={false}
        size="cart"
      />
      <p className={styles.name}>{product.namePl}</p>
      <span className={styles.price}>
        {formatPrice(Number(product.price) * cartItem.quantity)}
      </span>
      {product.inStock ? (
        <QuantityInput
          className={styles.input}
          value={cartItem.quantity}
          onChangeQuantity={onChangeQuantity}
        />
      ) : (
        <span className={styles.outOfStockLabel}>Produkt niedostępny</span>
      )}
      <button className={styles.remove} onClick={() => removeItem(product.id)}>
        Usuń <CloseIcon />
      </button>
    </article>
  );
};

export default CartItem;

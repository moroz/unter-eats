import useCart from "@/hooks/useCart";
import { transformProducts, calculateTotal } from "@/lib/cart/CartHelpers";
import { useGetProductsQuery } from "@api/queries";
import { Product } from "@interfaces";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CartModal.module.sass";

interface Props {}

const CartModal: React.FC<Props> = () => {
  const [lastResult, setLastResult] = useState<Record<string, Product>>({});

  const { toggleCart, items, removeItem } = useCart();
  const ids = items.map((i) => i.id);
  const { data } = useGetProductsQuery(ids);

  useEffect(() => {
    if (!data?.products) return;
    setLastResult(transformProducts(data.products));
  }, [data]);

  const grandTotal = useMemo(() => {
    if (!data?.products) return 0;
    return calculateTotal(items, data?.products);
  }, [items, data?.products]);

  if (!lastResult) return null;

  return (
    <>
      <div className={styles.overlay} onClick={toggleCart} />
      <div className={styles.modal}>
        <button onClick={toggleCart} className={styles.close}>
          &times;
        </button>
        <section className={styles.content}>
          {lastResult && (
            <ul>
              {items.map(({ id, quantity }) => {
                const product = lastResult[id];
                if (!product) return null;
                return (
                  <li key={id}>
                    {product.namePl}, {product.price} &times; {quantity}
                    <button onClick={() => removeItem(id)}>Remove</button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        <section className={styles.summary}>
          <p>Grand total: {grandTotal}</p>
        </section>
      </div>
    </>
  );
};

export default CartModal;

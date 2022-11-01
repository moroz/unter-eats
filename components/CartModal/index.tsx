import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/priceHelpers";
import { useCartProductsQuery } from "@api/queries";
import React, { useCallback, useEffect } from "react";
import Button from "../Button";
import styles from "./CartModal.module.sass";
import CloseIcon from "./xmark.svg";

interface Props {}

const CartModal: React.FC<Props> = () => {
  const { toggleCart, items, removeItem } = useCart();
  const { products, loading, grandTotal } = useCartProductsQuery();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleCart();
    },
    [toggleCart]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!products) return null;

  return (
    <div className={styles.modal}>
      <button onClick={toggleCart} className={styles.close}>
        Zamknij <CloseIcon />
      </button>
      <section className={styles.content}>
        {!loading && (
          <ul>
            {items.map(({ id, quantity }) => {
              const product = products[id];
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
        <table className={styles.summaryTable}>
          <tbody>
            <tr>
              <th>Podsuma:</th>
              <td>{formatPrice(grandTotal)}</td>
            </tr>
          </tbody>
        </table>
        <p>Koszty dostawy zostaną wyliczone w następnym etapie.</p>
        <Button href="/checkout" onClick={toggleCart}>
          Do kasy
        </Button>
      </section>
    </div>
  );
};

export default CartModal;

import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/priceHelpers";
import { useCartProductsQuery } from "@api/queries";
import React, { useCallback, useEffect } from "react";
import Button from "../Button";
import CartItem from "../CartItem";
import PaymentLogos from "../PaymentLogos";
import styles from "./CartModal.module.sass";
import CloseIcon from "./xmark.svg";

interface Props {}

const CartModal: React.FC<Props> = () => {
  const { toggleCart, items } = useCart();
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
  }, [handleKeyDown]);

  if (!products) return null;

  return (
    <div className={styles.modal}>
      <button onClick={toggleCart} className={styles.close}>
        Zamknij <CloseIcon />
      </button>
      <section className={styles.content}>
        {!loading && (
          <>
            {items.map((item) => (
              <CartItem
                product={products[item.id]}
                cartItem={item}
                key={item.id}
              />
            ))}
          </>
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
        <PaymentLogos className={styles.paymentMethods} />
      </section>
    </div>
  );
};

export default CartModal;

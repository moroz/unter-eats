import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/priceHelpers";
import { useCartProductsQuery } from "@api/queries";
import Head from "next/head";
import React, { useCallback, useEffect } from "react";
import Button from "../Button";
import PaymentLogos from "../PaymentLogos";
import styles from "./CartModal.module.sass";
import CloseIcon from "@icons/xmark.svg";
import Cart from "@components/Cart";

interface Props {}

const CartModal: React.FC<Props> = () => {
  const { toggleCart } = useCart();
  const { products, productTotal } = useCartProductsQuery();

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
      <Head>
        <html className="noscroll" />
      </Head>
      <button onClick={toggleCart} className={styles.close}>
        Zamknij <CloseIcon />
      </button>
      <h2>Koszyk</h2>
      <section className={styles.content}>
        <Cart />
      </section>
      <section className={styles.summary}>
        <table className={styles.summaryTable}>
          <tbody>
            <tr>
              <th>Podsuma:</th>
              <td>{formatPrice(productTotal)}</td>
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

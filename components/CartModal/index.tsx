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
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/config";

interface Props {}

const CartModal: React.FC<Props> = () => {
  const { toggleCart } = useCart();
  const {
    products,
    productTotal,
    grandTotal,
    isFreeShipping,
    isStoreOpen,
    loading
  } = useCartProductsQuery();

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

  if (!products || loading) return null;

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
        {!isStoreOpen && (
          <p className={styles.notOpen}>
            Przepraszamy! W tej chwili restauracja jest nieczynna. Zapraszamy do
            składania zamówień w godzinach pracy lokalu.
          </p>
        )}
        <table className={styles.summaryTable}>
          <tbody>
            {!isFreeShipping && (
              <tr className={styles.subtotal}>
                <th>Podsuma:</th>
                <td>{formatPrice(productTotal)}</td>
              </tr>
            )}
            <tr className={styles.shippingFee}>
              <th>Dostawa:</th>
              <td>
                {isFreeShipping ? "Bezpłatna" : formatPrice(SHIPPING_FEE)}
              </td>
            </tr>

            <tr className={styles.grandTotal}>
              <th>Do zapłaty:</th>
              <td>{formatPrice(grandTotal)}</td>
            </tr>
          </tbody>
        </table>
        {!isFreeShipping && (
          <p>
            Bezpłatna dostawa na terenie Koszalina przy zamówieniach powyżej{" "}
            {FREE_SHIPPING_THRESHOLD} zł.
          </p>
        )}
        {isStoreOpen && <Button href="/checkout">Do kasy</Button>}
        <PaymentLogos className={styles.paymentMethods} />
      </section>
    </div>
  );
};

export default CartModal;

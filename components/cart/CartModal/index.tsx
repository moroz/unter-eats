import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/priceHelpers";
import { useCartProductsQuery } from "@api/queries";
import Head from "next/head";
import React, { useCallback, useEffect } from "react";
import { Button, PaymentLogos } from "@components";
import styles from "./CartModal.module.sass";
import CloseIcon from "@icons/xmark.svg";
import Cart from "../Cart";
import CartSummary from "../CartSummary";
import CartEmpty from "../CartEmpty";

interface Props {}

const CartModal: React.FC<Props> = () => {
  const { isEmpty, toggleCart } = useCart();
  const { products, grandTotal, isStoreOpen, loading } = useCartProductsQuery();

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
        {isEmpty ? <CartEmpty /> : <Cart />}
      </section>
      <section className={styles.summary}>
        {!isStoreOpen && (
          <p className={styles.notOpen}>
            Przepraszamy! W tej chwili restauracja jest nieczynna. Zapraszamy do
            składania zamówień w godzinach pracy lokalu.
          </p>
        )}

        {!isEmpty && isStoreOpen && (
          <>
            <CartSummary />
            <Button href="/checkout" className={styles.cta}>
              Zamawiam za {formatPrice(grandTotal)}
            </Button>
            <PaymentLogos className={styles.paymentMethods} />
          </>
        )}
      </section>
    </div>
  );
};

export default CartModal;

import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/config";
import { useCartProductsQuery, useGetProductsQuery } from "@api/queries";
import { formatPrice } from "@lib/priceHelpers";
import React from "react";
import styles from "./CartSummary.module.sass";

interface Props {}

const CartSummary: React.FC<Props> = () => {
  const { isFreeShipping, grandTotal, productTotal } = useCartProductsQuery();

  return (
    <>
      <table className={styles.summaryTable}>
        <tbody>
          {!isFreeShipping && (
            <>
              <tr className={styles.subtotal}>
                <th>Podsuma:</th>
                <td>{formatPrice(productTotal)}</td>
              </tr>
              <tr className={styles.shippingFee}>
                <th>Dostawa:</th>
                <td>
                  {isFreeShipping ? "Bezpłatna" : formatPrice(SHIPPING_FEE)}
                </td>
              </tr>
            </>
          )}

          <tr className={styles.grandTotal}>
            <th>Do zapłaty:</th>
            <td>{formatPrice(grandTotal)}</td>
          </tr>
        </tbody>
      </table>
      <p>
        Bezpłatna dostawa na terenie Koszalina przy zamówieniach powyżej{" "}
        {FREE_SHIPPING_THRESHOLD} zł.
      </p>
    </>
  );
};

export default CartSummary;

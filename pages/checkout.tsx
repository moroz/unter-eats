import React from "react";
import Layout from "@layout";
import { PaymentForm, StripeProvider } from "@components";
import useHydrated from "@hooks/useHydrated";
import useCart from "@hooks/useCart";
import { useCartProductsQuery } from "@api/queries";

interface Props {}

const Checkout: React.FC<Props> = () => {
  const hydrated = useHydrated();

  const { items, ids } = useCart();
  const { products, loading, grandTotal } = useCartProductsQuery();

  return (
    <Layout title="Checkout">
      <div className="container">{hydrated && ""}</div>
    </Layout>
  );
};

export default Checkout;

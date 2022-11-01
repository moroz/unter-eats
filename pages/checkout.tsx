import React from "react";
import Layout from "@layout";
import { PaymentForm, StripeProvider } from "@components";
import useHydrated from "@hooks/useHydrated";

interface Props {}

const Checkout: React.FC<Props> = () => {
  const hydrated = useHydrated();

  return (
    <Layout title="Checkout">
      <div className="container">
        {hydrated && (
          <StripeProvider amount={2137}>
            <PaymentForm amount={2137} />
          </StripeProvider>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;

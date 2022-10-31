import React from "react";
import Layout from "@layout";
import PaymentForm from "@/components/PaymentForm";

interface Props {}

const Checkout: React.FC<Props> = () => {
  return (
    <Layout title="Checkout">
      <div className="container">
        <PaymentForm amount={2137} />
      </div>
    </Layout>
  );
};

export default Checkout;

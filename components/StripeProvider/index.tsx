import React, { useEffect } from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentIntentMutation } from "@api/mutations";

interface Props {
  amount: number;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TOKEN!
);

const buildTheme = (): Appearance => {
  const computed = getComputedStyle(document.body);

  return {
    variables: {
      fontFamily: computed.getPropertyValue("font-family"),
      borderRadius: "0px",
      colorBackground: computed.getPropertyValue("--surface-1dp"),
      colorPrimary: computed.getPropertyValue("--primary"),
      colorText: computed.getPropertyValue("--stripe-label-color"),
      colorTextSecondary: computed.getPropertyValue("--fg-color"),
      colorTextPlaceholder: computed.getPropertyValue("--input-placeholder")
    }
  };
};

interface Props {
  amount: number;
  children: React.ReactNode;
}

const StripeProvider: React.FC<Props> = ({ amount, children }) => {
  const [mutate, { data }] = useCreatePaymentIntentMutation();

  useEffect(() => {
    mutate({ variables: { amount } });
  }, [mutate]);

  if (!data) return null;
  const clientSecret = data.result.clientSecret;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        locale: "pl",
        appearance: buildTheme()
      }}
    >
      {children}
    </Elements>
  );
};

export default StripeProvider;

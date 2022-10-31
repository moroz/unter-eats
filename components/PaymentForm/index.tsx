import React, { useEffect, useMemo } from "react";
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
      colorTextSecondary: computed.getPropertyValue("--fg-color")
    }
  };
};

const PaymentForm: React.FC<Props> = ({ amount }) => {
  const [mutate, { data }] = useCreatePaymentIntentMutation();

  const isDarkMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !!window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  }, []);

  useEffect(() => {
    mutate({ variables: { amount } });
  }, [mutate]);

  if (!data) return null;
  const clientSecret = data.result.clientSecret;
  const theme = isDarkMode ? "night" : "stripe";

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        locale: "pl",
        appearance: buildTheme()
      }}
    >
      <PaymentElement />
    </Elements>
  );
};

export default PaymentForm;

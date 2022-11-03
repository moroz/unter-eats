import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";

interface Props {
  amount: number;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TOKEN!
);

const buildTheme = (): Appearance => {
  if (typeof window === "undefined") return {};

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
    },
    rules: {
      ".Input": {
        borderColor: computed.getPropertyValue("--fg-color"),
        boxShadow: "none"
      },
      ".Input:focus": {
        borderColor: computed.getPropertyValue("--primary")
      },
      ".Tab": {
        borderColor: computed.getPropertyValue("--fg-color")
      }
    }
  };
};

interface Props {
  amount: number;
  clientSecret: string;
  children: React.ReactNode;
}

const StripeProvider: React.FC<Props> = ({ children, clientSecret }) => {
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

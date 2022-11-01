import React, { FormEventHandler, useCallback } from "react";
import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import Button from "../Button";
import Padlock from "./lock.svg";
import styles from "./PaymentForm.module.sass";

interface Props {
  amount: number;
}

const PaymentForm: React.FC<Props> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (!stripe || !elements) return;

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: location.origin + "/"
        }
      });

      console.log(result);
    },
    [elements, stripe]
  );

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      <Button type="submit" className={styles.button}>
        <Padlock />
        Zapłać {amount / 100} PLN
      </Button>
    </form>
  );
};

export default PaymentForm;

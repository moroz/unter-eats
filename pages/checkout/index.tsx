import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CheckoutLayout,
  PaymentForm,
  PaymentLogos,
  StripeProvider
} from "@components";
import { useCartProductsQuery } from "@api/queries";
import { useForm } from "react-hook-form";
import {
  FormWrapper,
  InputField,
  RadioGroup,
  RadioButton,
  Textarea
} from "@components/forms";
import InputGroup from "@components/forms/InputGroup";
import styles from "./Checkout.module.sass";
import { formatPrice } from "@lib/priceHelpers";
import { DeliveryType, OrderParams } from "@interfaces";
import { useCreateOrderMutation } from "@api/mutations";
import useCart from "@hooks/useCart";
import { PaymentMethodCreateParams } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { buildMetadata } from "@lib/orderMetadata";
import { validateEmail } from "@lib/emailValidation";
import { setFormErrors } from "@lib/formHelpers";

interface Props {}

const Checkout: React.FC<Props> = () => {
  const methods = useForm<OrderParams>({
    defaultValues: {
      deliveryType: DeliveryType.Delivery
    }
  });
  const { register, watch, setError } = methods;
  const isDelivery =
    watch("deliveryType", DeliveryType.Delivery) === DeliveryType.Delivery;
  const { firstName, lastName, email, phoneNo, shippingAddress } = watch();
  const billingDetails: PaymentMethodCreateParams.BillingDetails = {
    name: [firstName, lastName].filter(Boolean).join(" "),
    email,
    phone: phoneNo,
    address: {
      country: "PL",
      postal_code: "",
      state: "zachodniopomorskie",
      city: "Koszalin",
      line1: shippingAddress ?? "",
      line2: ""
    }
  };

  const [paymentIntentSecret, setPaymentIntentSecret] = useState<string | null>(
    null
  );

  const router = useRouter();

  const { items, isEmpty } = useCart();
  const { grandTotal, isStoreOpen } = useCartProductsQuery();

  useEffect(() => {
    if (isEmpty || !isStoreOpen) {
      router.push("/");
    }
  }, [isEmpty, router, isStoreOpen]);

  const [mutate, { loading }] = useCreateOrderMutation();

  const onSubmit = useCallback(
    async (params: OrderParams) => {
      const result = await mutate({
        variables: {
          params: { ...params, lineItems: items, metadata: buildMetadata() }
        }
      });
      if (result.data?.result.success) {
        const clientSecret = result.data.result.data.paymentIntent.clientSecret;
        if (clientSecret) {
          setPaymentIntentSecret(clientSecret);
        }
      } else {
        setFormErrors(setError, result.data?.result.errors);
      }
    },
    [mutate, items, setError]
  );

  if (paymentIntentSecret) {
    const amount = Math.floor(grandTotal * 100);

    return (
      <CheckoutLayout title="P??atno????">
        <StripeProvider amount={amount} clientSecret={paymentIntentSecret}>
          <PaymentForm amount={amount} billingDetails={billingDetails} />
        </StripeProvider>
      </CheckoutLayout>
    );
  }

  return (
    <CheckoutLayout title="Formularz zam??wienia">
      <FormWrapper {...methods} className={styles.form} onSubmit={onSubmit}>
        <InputGroup columns={2}>
          <InputField
            {...register("firstName", { required: true })}
            label="Imi??"
            required
            autoComplete="given-name"
          />
          <InputField
            {...register("lastName")}
            label="Nazwisko"
            autoComplete="family-name"
          />
        </InputGroup>
        <InputGroup columns={2}>
          <InputField
            {...register("email", {
              required: true,
              validate: { validateEmail }
            })}
            label="E-mail"
            helperText="Na ten adres otrzymasz potwierdzenie zam??wienia. Nie wysy??amy tre??ci reklamowych."
            required
            autoComplete="email"
          />
          <InputField
            {...register("phoneNo", { required: true })}
            label="Telefon kontaktowy"
            helperText="Pod ten numer b??dziemy dzwoni?? w razie pyta?? dotycz??cych dostawy. W przypadku zagranicznych numer??w telefonu, prosz?? poda?? numer z kodem kierunkowym kraju, np. +496912345678."
            required
            autoComplete="tel"
          />
        </InputGroup>
        <RadioGroup label="Spos??b dostawy">
          <RadioButton
            {...register("deliveryType")}
            label="Dow??z do domu"
            value={DeliveryType.Delivery}
          />
          <RadioButton
            {...register("deliveryType")}
            label="Odbi??r osobisty w lokalu"
            value={DeliveryType.Pickup}
          />
        </RadioGroup>
        {isDelivery && (
          <InputField
            {...register("shippingAddress", { required: isDelivery })}
            label="Adres dostawy"
            required
            autoComplete="street-address"
          />
        )}
        <Textarea label="Uwagi do zam??wienia" {...register("remarks")} />
        <Button type="submit" disabled={loading} className={styles.cta}>
          Zamawiam i p??ac?? {formatPrice(grandTotal)}
        </Button>
        <p className={styles.paymentMemo}>
          W nast??pnym kroku dokonasz p??atno??ci przy u??yciu jednej z poni??szych
          metod p??atno??ci.
          <br />
          P??atno??ci obs??ugiwane s?? przez{" "}
          <a
            href="https://www.stripe.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe
          </a>
          .
        </p>
        <PaymentLogos />
      </FormWrapper>
    </CheckoutLayout>
  );
};

export default Checkout;

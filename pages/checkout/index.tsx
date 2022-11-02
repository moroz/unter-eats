import React from "react";
import { Button, CheckoutLayout, Logo } from "@components";
import useHydrated from "@hooks/useHydrated";
import useCart from "@hooks/useCart";
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
import Link from "next/link";
import { formatPrice } from "@lib/priceHelpers";

interface Props {}

interface OrderParams {
  fullName: string;
  deliveryMethod: "DELIVERY" | "PICKUP";
  email: string;
  phoneNo: string;
  shippingAddress: string;
  notes: string;
}

const Checkout: React.FC<Props> = () => {
  const hydrated = useHydrated();
  const methods = useForm<OrderParams>({
    defaultValues: {
      deliveryMethod: "DELIVERY"
    }
  });
  const { register, watch } = methods;
  const isDelivery = watch("deliveryMethod", "DELIVERY") === "DELIVERY";

  const { items, ids } = useCart();
  const { products, loading, grandTotal } = useCartProductsQuery();

  return (
    <CheckoutLayout title="Checkout">
      <div className={styles.grid}>
        <FormWrapper {...methods} className={styles.form}>
          <Link href="/">
            <Logo className={styles.logo} />
          </Link>
          <InputField
            {...register("fullName")}
            label="Imię i nazwisko"
            required
          />
          <InputGroup columns={2}>
            <InputField
              {...register("email")}
              label="E-mail"
              helperText="Na ten adres otrzymasz potwierdzenie zamówienia. Nie wysyłamy treści reklamowych."
              required
            />
            <InputField
              {...register("phoneNo")}
              label="Telefon kontaktowy"
              helperText="Pod ten numer będziemy dzwonić w razie pytań dotyczących dostawy."
              required
            />
          </InputGroup>
          <RadioGroup label="Sposób dostawy">
            <RadioButton
              {...register("deliveryMethod")}
              label="Dowóz do domu"
              value="DELIVERY"
            />
            <RadioButton
              {...register("deliveryMethod")}
              label="Odbiór osobisty w lokalu"
              value="PICKUP"
            />
          </RadioGroup>
          {isDelivery && (
            <InputField
              {...register("shippingAddress")}
              label="Adres dostawy"
              required
            />
          )}
          <Textarea label="Uwagi do zamówienia" {...register("notes")} />
          <Button type="submit">Zamawiam za {formatPrice(grandTotal)}</Button>
        </FormWrapper>
      </div>
    </CheckoutLayout>
  );
};

export default Checkout;

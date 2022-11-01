import React from "react";
import Layout from "@layout";
import { Button, CheckoutLayout } from "@components";
import useHydrated from "@hooks/useHydrated";
import useCart from "@hooks/useCart";
import { useCartProductsQuery } from "@api/queries";
import { useForm } from "react-hook-form";
import { FormWrapper, InputField } from "@components/forms";
import InputGroup from "@components/forms/InputGroup";

interface Props {}

const Checkout: React.FC<Props> = () => {
  const hydrated = useHydrated();
  const methods = useForm();
  const { register } = methods;

  const { items, ids } = useCart();
  const { products, loading, grandTotal } = useCartProductsQuery();

  return (
    <CheckoutLayout title="Checkout">
      <FormWrapper {...methods} className="container">
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
        <InputField
          {...register("shippingAddress")}
          label="Adres dostawy"
          required
        />
        <Button type="submit">Zamawiam z obowiązkiem zapłaty</Button>
      </FormWrapper>
    </CheckoutLayout>
  );
};

export default Checkout;

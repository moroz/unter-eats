import { CheckoutLayout } from "@components";
import useCartReducer from "@hooks/useCartReducer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./Success.module.sass";

interface Props {}

const Success: React.FC<Props> = () => {
  const { reset } = useCartReducer();
  const query = useRouter().query;

  useEffect(() => {
    if (query["redirect_status"] === "succeeded") reset();
  }, []);

  return (
    <CheckoutLayout preventLeaving={false} className={styles.page}>
      <div>
        <h1>Dziękujemy za złożenie zamówienia!</h1>
        <p>
          Potwierdzenie zamówiena wysłaliśmy na adres e-mail, podany w
          zamówieniu.
        </p>
        <Link href="/" className={styles.link}>
          Powrót do strony głównej
        </Link>
      </div>
    </CheckoutLayout>
  );
};

export default Success;

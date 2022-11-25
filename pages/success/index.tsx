import { CheckoutLayout } from "@components";
import useCart from "@hooks/useCart";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./Success.module.sass";

interface Props {}

const Success: React.FC<Props> = () => {
  const { reset } = useCart();

  useEffect(reset, [reset]);

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

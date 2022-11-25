import React, { useCallback, useEffect } from "react";
import styles from "./CheckoutLayout.module.sass";
import Head from "next/head";
import { PAGE_TITLE } from "@/config";
import Link from "next/link";
import { Logo } from "@components";
import Router from "next/router";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  title?: string;
  preventLeaving?: boolean;
  className?: string;
}

const CheckoutLayout: React.FC<Props> = ({
  children,
  title,
  className,
  preventLeaving = true
}) => {
  const beforeUnloadListener = useCallback(() => {
    if (!preventLeaving) return;

    if (!confirm("Czy na pewno chcesz przerwać składanie zamówienia?")) {
      throw "route canceled";
    }
  }, [preventLeaving]);

  useEffect(() => {
    Router.events.on("routeChangeStart", beforeUnloadListener);

    return () => {
      Router.events.off("routeChangeStart", beforeUnloadListener);
    };
  }, [beforeUnloadListener]);

  return (
    <div className={clsx(styles.layout, className)}>
      <Head>
        <title>{title ? `${title} | ${PAGE_TITLE}` : PAGE_TITLE}</title>
      </Head>
      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default CheckoutLayout;

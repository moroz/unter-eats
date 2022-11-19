import React from "react";
import styles from "./CheckoutLayout.module.sass";
import Head from "next/head";
import { PAGE_TITLE } from "@/config";
import Link from "next/link";
import { Logo } from "@components";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const CheckoutLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.layout}>
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

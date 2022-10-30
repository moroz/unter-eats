import { PAGE_TITLE } from "@/config";
import useCart from "@/hooks/useCart";
import { Category } from "@interfaces";
import clsx from "clsx";
import Head from "next/head";
import React from "react";
import CartModal from "../CartModal";
import CategoryNavigation from "../CategoryNavigation";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.sass";

interface Props {
  children?: React.ReactNode;
  title?: string;
  categories?: Category[];
}

const Layout: React.FC<Props> = ({ children, title, categories }) => {
  const { toggleCart, open } = useCart();
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title ? `${title} | ${PAGE_TITLE}` : PAGE_TITLE}</title>
      </Head>
      <Header />
      {categories ? <CategoryNavigation categories={categories} /> : null}
      <main>
        <h2 className={styles.pageTitle}>{title}</h2>
        {children}
      </main>
      <Footer />
      <div
        className={clsx(styles.overlay, open && styles.open)}
        onClick={toggleCart}
      />
      {open && <CartModal />}
    </div>
  );
};

export default Layout;

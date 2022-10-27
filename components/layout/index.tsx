import { PAGE_TITLE } from "@/config";
import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.sass";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title ? `${title} | ${PAGE_TITLE}` : PAGE_TITLE}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

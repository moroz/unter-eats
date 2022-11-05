import Link from "next/link";
import React from "react";
import styles from "./Header.module.sass";
import Logo from "../../Logo";
import clsx from "clsx";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import CartButton from "@/components/CartButton";
import { Spin as Hamburger } from "hamburger-react";
import PhoneIcon from "../../../icons/phone.svg";
import { Category } from "@interfaces";
import CategoryNavigation from "@components/CategoryNavigation";

interface Props {
  categories: Category[];
}

const Header: React.FC<Props> = ({ categories }) => {
  const opaque = useHeaderScroll();

  return (
    <header className={clsx(styles.header, opaque && styles.opaque)}>
      <div className={styles.hamburger}>
        <Hamburger direction="right" />
      </div>
      <Link href="/" className={styles.logo} title="Artesano Sports Bar & Food">
        <Logo />
      </Link>
      <Link href="/kontakt" className={styles.contact}>
        <PhoneIcon />
      </Link>
      <CartButton className={styles.cart} />
      <CategoryNavigation categories={categories} />
    </header>
  );
};

export default Header;

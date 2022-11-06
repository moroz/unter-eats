import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.sass";
import Logo from "../../Logo";
import { CartButton } from "@components";
import { Spin as Hamburger } from "hamburger-react";
import PhoneIcon from "../../../icons/phone.svg";
import { Category } from "@interfaces";
import CategoryNavigation from "@components/CategoryNavigation";
import { useRouter } from "next/router";
import useCart from "@hooks/useCart";

interface Props {
  categories: Category[];
}

const Header: React.FC<Props> = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const { asPath } = useRouter();
  const { closeCart } = useCart();

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onToggle = useCallback(() => {
    closeCart();
    setOpen((t) => !t);
  }, [setOpen, closeCart]);

  useEffect(() => {
    setOpen(false);
    closeCart();
  }, [asPath, closeCart]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.hamburger}>
          <Hamburger direction="right" toggled={open} toggle={onToggle} />
        </div>
        <Link
          href="/"
          className={styles.logo}
          title="Artesano Sports Bar & Food"
        >
          <Logo />
        </Link>
        <CategoryNavigation
          className={styles.inlineCategories}
          categories={categories}
          open={open}
          setOpen={setOpen}
        />
        <Link href="/kontakt" className={styles.contact}>
          <PhoneIcon />
          <span className={styles.label}>Kontakt</span>
        </Link>
        <CartButton className={styles.cart} closeMenu={closeMenu} />
      </header>
      <CategoryNavigation
        className={styles.standaloneCategories}
        categories={categories}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Header;

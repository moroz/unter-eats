import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.sass";
import Logo from "../../Logo";
import clsx from "clsx";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import CartButton from "@/components/CartButton";
import { Spin as Hamburger } from "hamburger-react";
import PhoneIcon from "../../../icons/phone.svg";
import { Category } from "@interfaces";
import CategoryNavigation from "@components/CategoryNavigation";
import { useRouter } from "next/router";

interface Props {
  categories: Category[];
}

const Header: React.FC<Props> = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const { asPath } = useRouter();

  const onToggle = useCallback(() => {
    setOpen((t) => !t);
  }, [setOpen]);

  useEffect(() => {
    setOpen(false);
  }, [asPath]);

  return (
    <header className={styles.header}>
      <div className={styles.hamburger}>
        <Hamburger direction="right" toggled={open} toggle={onToggle} />
      </div>
      <Link href="/" className={styles.logo} title="Artesano Sports Bar & Food">
        <Logo />
      </Link>
      <Link href="/kontakt" className={styles.contact}>
        <PhoneIcon />
      </Link>
      <CartButton className={styles.cart} />
      <CategoryNavigation
        categories={categories}
        open={open}
        setOpen={setOpen}
      />
    </header>
  );
};

export default Header;

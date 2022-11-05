import Link from "next/link";
import React from "react";
import styles from "./Header.module.sass";
import Logo from "../../Logo";
import clsx from "clsx";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import CartButton from "@/components/CartButton";
import { Spin as Hamburger } from "hamburger-react";
import PhoneIcon from "../../../icons/phone.svg";

interface Props {}

const Header: React.FC<Props> = () => {
  const opaque = useHeaderScroll();

  return (
    <header className={clsx(styles.header, opaque && styles.opaque)}>
      <div className={styles.hamburger}>
        <Hamburger direction="right" />
      </div>
      <Link href="/" className={styles.logo} title="Artesano Sports Bar & Food">
        <Logo />
      </Link>
      <Link href="/contact" className={styles.contact}>
        <PhoneIcon />
      </Link>
      <CartButton className={styles.cart} />
    </header>
  );
};

export default Header;

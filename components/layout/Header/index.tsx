import Link from "next/link";
import React from "react";
import styles from "./Header.module.sass";
import Logo from "./artesano_logo.svg";
import clsx from "clsx";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import useCart from "@/hooks/useCart";

interface Props {}

const Header: React.FC<Props> = () => {
  const opaque = useHeaderScroll();
  const { items } = useCart();

  return (
    <header className={clsx(styles.header, opaque && styles.opaque)}>
      <Link href="/" className={styles.logo} title="Artesano Sports Bar & Food">
        <Logo />
      </Link>
      <nav className={styles.navbar}>
        <Link href="/">Strona główna</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/koszyk">
          Koszyk {items.length ? `(${items.length})` : null}
        </Link>
      </nav>
    </header>
  );
};

export default Header;

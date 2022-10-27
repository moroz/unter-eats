import Link from "next/link";
import React from "react";
import styles from "./Header.module.sass";

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <h1>Artesano</h1>
        <small>Sports Bar</small>
      </Link>
      <nav className={styles.navbar}>
        <Link href="/">Strona główna</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/koszyk">Koszyk</Link>
      </nav>
    </header>
  );
};

export default Header;

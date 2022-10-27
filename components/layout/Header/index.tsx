import Link from "next/link";
import React from "react";
import styles from "./Header.module.sass";
import Logo from "./artesano_logo.svg";

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} title="Artesano Sports Bar & Food">
        <Logo />
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

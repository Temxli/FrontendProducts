"use client";

import styles from "./Header.module.css";
import Button from "../Button/Button";
import Link from "next/link";

export default function Header() {
  return (
    <header className={`${styles.header}`}>
      <Link href={'/'}>
        <h1 className={styles.title}>Product Receive</h1>
      </Link>
      <nav className={styles.navbar}>
        <Button title="Orders" link="/order" />
        <Button title="Log Out" link="/login" />
      </nav>
    </header>
  );
}
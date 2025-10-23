"use client";

import styles from "./Header.module.css";
import Button from "../Button/Button";

export default function Header() {
  return (
    <header className={`${styles.header}`}>
      <h1 className={styles.title}>Product Receive</h1>
      <nav className={styles.navbar}>
        <Button title="Login" link="/login" />
        <Button title="Registration" link="/registration" />
      </nav>
    </header>
  );
}
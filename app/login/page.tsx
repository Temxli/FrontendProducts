"use client";

import InputField from "../components/InputField/InputField";
import Link from "next/link";
import Button from "../components/Button/Button";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.login_inner}>
        <InputField placeHolder="Enter the Username" />
        <InputField placeHolder="Enter the Password" />
        <Button title="Login" link="/" />
        <Link href="/registration" className={styles.register_link}>Don't have an account? Register Here</Link>
      </div>
    </div>
  );
}
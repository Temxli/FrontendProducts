
import styles from "./Header.module.css";
import Button from "../Button/Button";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Header() {
  const cookie = (await cookies()).get('Authorization')?.value;
  console.log('Header cookie:', cookie);

  return (
    <header className={`${styles.header}`}>
      <Link href={'/'}>
        <h1 className={styles.title}>Product Receive</h1>
      </Link>
      {cookie ? (      <nav className={styles.navbar}>
        <Button title="Orders" link="/order" />
        <Button title="Log Out" link="/" />
      </nav>) : (      <nav className={styles.navbar}>
        <Button title="Login" link="/login" />
        <Button title="Sign Up" link="/registration" />
      </nav>)}

    </header>
  );
}
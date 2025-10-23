"use client";

import { useState, FormEvent } from "react";
import InputField from "../components/InputField/InputField";
import Link from "next/link";
import Button from "../components/Button/Button";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://10.1.101.59:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Server response:", data);

      router.push("/");
    } catch (error: any) {
      alert(error.message || "Login failed");
      console.error("❌ Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_inner}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <InputField
            placeHolder="Enter the Username"
            value={username}
            onChange={setUsername}
          />
          <InputField
            placeHolder="Enter the Password"
            value={password}
            onChange={setPassword}
            type="password"
          />

          <Button title={loading ? "Logging in..." : "Login"} type="submit" />
        </form>

        <Link href="/registration" className={styles.register_link}>
          Don’t have an account? Register Here
        </Link>
      </div>
    </div>
  );
}
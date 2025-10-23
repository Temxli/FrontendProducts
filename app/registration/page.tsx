"use client";

import { useState } from "react";
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";
import styles from "./registration.module.css";
import Link from "next/link";

export default function Registration() {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!name || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("http://10.1.101.59:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, password }),
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Failed to register");
            }
            const data = await res.json();
            console.log("User registered:", data);
            alert("Registration successful!");
            window.location.href = "/login";
        } catch (error) {
            console.error(error);
            alert("Registration failed!");
        }
    };

    return (
        <div className={styles.registration}>
            <div className={styles.registration_inner}>
                <h1 className={styles.title}>Registration</h1>
                <InputField placeHolder="Enter the Username" onChange={setUsername} />
                <InputField placeHolder="Enter the Email" />
                <InputField placeHolder="Enter the Password" onChange={setPassword} />
                <Button title="Register" onClick={handleRegister} />
                <Link href="/login" className={styles.login_link}>
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}
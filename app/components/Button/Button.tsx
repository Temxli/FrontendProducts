"use client";

import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string;
    link?: string;
    onClick?: () => void;
    type?: "button" | "submit";
};

export default function Button({ title, link, onClick, type }: ButtonProps) {
    if (link) {
        return (
            <Link href={link} className={styles.button}>
                {title}
            </Link>
        );
    }

    return (
        <button className={styles.button} type={type} onClick={onClick}>
            {title}
        </button>
    );
}
"use client";

import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string;
    link?: string;
    onClick?: () => void;
};

export default function Button({ title, link, onClick }: ButtonProps) {
    // если передан link → используем Link от next.js
    if (link) {
        return (
            <Link href={link} className={styles.button}>
                {title}
            </Link>
        );
    }

    // если передан onClick → обычная кнопка
    return (
        <button className={styles.button} onClick={onClick}>
            {title}
        </button>
    );
}
"use client";

import styles from "./InputField.module.css";

export default function InputField(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className={styles.input}
      placeholder={props.value}
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

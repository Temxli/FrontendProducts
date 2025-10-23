"use client";
import styles from "./InputField.module.css";

type InputFieldProps = {
  placeHolder: string;
  onChange?: (value: string) => void;
};

export default function InputField({ placeHolder, onChange }: InputFieldProps) {
  return (
    <input
      className={styles.input}
      placeholder={placeHolder}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
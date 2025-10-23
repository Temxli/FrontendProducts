"use client";
import styles from "./InputField.module.css";

type InputFieldProps = {
  placeHolder: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
};

export default function InputField({
  placeHolder,
  value,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <input
      className={styles.input}
      placeholder={placeHolder}
      value={value}
      type={type}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
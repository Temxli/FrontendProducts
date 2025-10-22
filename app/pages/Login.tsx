"use client";

import InputField from "../components/InputField/InputField";

export default function Login() {
  return (
    <div>
      <InputField value="" onChange={(value) => console.log(value)} />
      <InputField value="" onChange={(value) => console.log(value)} />
    </div>
  );
}

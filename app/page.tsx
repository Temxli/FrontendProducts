"use client";

import Navlink from "next/link";

export default function HomePage() {
  return (
    <div>
      <Navlink href="/login">Login</Navlink>
      <Navlink href="/registration">Registration</Navlink>
    </div>
  );
}

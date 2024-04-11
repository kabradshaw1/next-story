"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {

  const pathname = usePathname() || '';

  return (
    <header>
      <Link className={pathname.startsWith('/') ? 'font-bold custom-blue' : 'dark-gray'} href={"/"}>Galaxy Voyagers</Link>
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
    </header>
  )
}
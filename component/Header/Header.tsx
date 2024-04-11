"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {

  const pathname = usePathname() || '';
  console.log(pathname);
  return (
    <header>
      <Link className={pathname.startsWith('/') ? 'font-bold custom-blue' : 'dark-gray'} href={"/"}>Galaxy Voyagers</Link>
      <Link className={pathname.startsWith('/login') ? 'font-bold custom-blue' : 'dark-gray'}href={"/login"}>Login</Link>
      <Link className={pathname.startsWith('/register') ? 'font-bold custom-blue' : 'dark-gray'} href={"/register"}>Register</Link>

    </header>
  )
}
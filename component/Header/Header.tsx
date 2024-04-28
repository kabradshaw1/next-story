"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  // Helper function to determine if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <header>
      <Link className={isActive('/') ? 'font-bold custom-blue' : 'dark-gray'} href="/">
        Galaxy Voyagers
      </Link>
      <Link className={isActive('/login') ? 'font-bold custom-blue' : 'dark-gray'} href="/login">
        Login
      </Link>
      <Link className={isActive('/register') ? 'font-bold custom-blue' : 'dark-gray'} href="/register">
        Register
      </Link>
    </header>
  );
}
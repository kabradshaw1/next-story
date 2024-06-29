'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar(): JSX.Element {
  const pathname = usePathname();

  // Helper function to determine if the link is active
  const isActive = (path: string): boolean => pathname === path;
  return (
    <nav className="flex justify-start items-center py-4">
      <Link
        className={isActive('/') ? 'font-bold custom-blue' : 'dark-gray'}
        href="/"
      >
        Galaxy Voyagers
      </Link>
      <Link
        className={isActive('/login') ? 'font-bold custom-blue' : 'dark-gray'}
        href="/login"
      >
        Login
      </Link>
      <Link
        className={
          isActive('/register') ? 'font-bold custom-blue' : 'dark-gray'
        }
        href="/register"
      >
        Register
      </Link>
    </nav>
  );
}

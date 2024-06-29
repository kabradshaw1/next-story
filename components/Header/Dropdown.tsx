'use client';
import Link from 'next/link';

// import { useAppSelector } from '@/lib/store/store';

export default function Dropdown(): JSX.Element {
  // const auth = useAppSelector((state) => state.auth);
  return (
    <div>
      <p>Dropdown</p>
      <Link className="dark-gray" href="/login">
        Login
      </Link>
      <Link className="dark-gray" href="/register">
        Register
      </Link>
      <Link className="dark-gray" href="/forgot-password">
        Forgot Password
      </Link>
    </div>
  );
}

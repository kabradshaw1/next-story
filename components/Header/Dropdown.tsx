'use client';
import { useState } from 'react';

import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

import authSlice from '@/lib/store/slices/authSlice';
import { useAppSelector, useAppDispatch } from '@/lib/store/store';

export default function Dropdown(): JSX.Element {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const user = token !== null ? jwtDecode(token) : null;
  console.log(user);
  const handleLogout = (): void => {
    dispatch(authSlice.actions.logout());
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-gray-200 rounded-md"
      >
        Menu
      </button>
      <Link className="dark-gray" href="/login">
        Login
      </Link>
      <Link className="dark-gray" href="/register">
        Register
      </Link>
      <Link className="dark-gray" href="/update-profile">
        Update Profile
      </Link>
      <a className="dark-gray" onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
}

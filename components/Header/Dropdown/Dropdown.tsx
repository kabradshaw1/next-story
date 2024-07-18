'use client';
import { useState, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

import { setupInterceptors } from '@/lib/axios';
import authSlice from '@/lib/store/slices/authSlice';
import { useAppSelector, useAppDispatch } from '@/lib/store/store';

type DecodedToken = {
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export default function Dropdown(): JSX.Element {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const user = token !== null ? (jwtDecode(token) as DecodedToken) : null;

  const handleLogout = (): void => {
    dispatch(authSlice.actions.logout());
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Set up Axios interceptors
    setupInterceptors().catch((error) => {
      console.error('Error setting up interceptors:', error);
    });
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-gray-200 rounded-md"
      >
        {user !== null ? `${user.username}` : 'Welcome'}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            href="/register"
          >
            Register
          </Link>
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            href="/update-profile"
          >
            Update Profile
          </Link>
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            href="/forgot-password"
          >
            Forgot Password
          </Link>
          <a
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}

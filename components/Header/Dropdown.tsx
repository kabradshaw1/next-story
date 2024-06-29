'use client';
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
  return (
    <div>
      <p>Dropdown</p>
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

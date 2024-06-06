import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token: string): boolean => {
  const decoded: { exp: number } = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};
export default isTokenExpired;

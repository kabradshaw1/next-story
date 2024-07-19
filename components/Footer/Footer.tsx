import Link from 'next/link';
import {
  FaXTwitter,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
} from 'react-icons/fa6';

export default function Footer(): JSX.Element {
  return (
    <footer className="p-4 bg-gray-800 text-white flex flex-col items-center">
      <h1 className="text-lg font-bold mb-3">GVGamers</h1>
      <div className="mb-3 text-center">
        <p>Address: Raleigh, NC</p>
        <p>Phone: (123) 456-7890</p>
        <p>
          <a href="mailto:example@example.com" className="text-blue-400">
            example@example.com
          </a>
        </p>
      </div>
      <div className="flex space-x-4">
        <Link href="https://x.com" aria-label="X">
          <FaXTwitter />
        </Link>
        <Link href="https://facebook.com" aria-label="Facebook">
          <FaFacebook />
        </Link>
        <Link href="mailto:example@example.com" aria-label="Mail">
          <FaEnvelope />
        </Link>
        <Link href="https://instagram.com" aria-label="Instagram">
          <FaInstagram />
        </Link>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import {
  FaXTwitter,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
} from 'react-icons/fa6';

export default function Footer(): JSX.Element {
  return (
    <footer className="p-6 text-blue-400 text-center flex justify-between items-start">
      <div className="flex flex-col items-center mx-auto text-center">
        <h1 className="text-lg font-bold text-blue-500 mb-1">GVGamers</h1>
        <div className="mb-3 text-center">
          <p>Raleigh, NC</p>
          <p>(123) 456-7890</p>
          <p>
            <a href="mailto:example@example.com" className="text-blue-400">
              example@example.com
            </a>
          </p>
        </div>
        <div className="flex space-x-4 mb-3 text-center">
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
      </div>
      <div className="flex flex-col space-y-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded text-sm">
          Accept Cookies
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-3 rounded text-sm">
          Manage Cookies
        </button>
        <Link href="/privacy-policy">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-3 rounded text-sm">
            Privacy Policy
          </button>
        </Link>
      </div>
    </footer>
  );
}

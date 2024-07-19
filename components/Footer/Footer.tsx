import Link from 'next/link';
import { FaTwitter, FaFacebook, FaEnvelope, FaInstagram } from 'react-icons/fa';

export default function Footer(): JSX.Element {
  return (
    <footer className="p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Contact Information</h1>
      <div className="mb-4">
        <p>Address: 123 Main Street, Anytown, USA</p>
        <p>Phone: (123) 456-7890</p>
        <p>
          Email:{' '}
          <a href="mailto:example@example.com" className="text-blue-400">
            example@example.com
          </a>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <Link href="https://twitter.com" aria-label="Twitter">
          <FaTwitter className="text-2xl" />
        </Link>
        <Link href="https://facebook.com" aria-label="Facebook">
          <FaFacebook className="text-2xl" />
        </Link>
        <Link href="mailto:example@example.com" aria-label="Mail">
          <FaEnvelope className="text-2xl" />
        </Link>
        <Link href="https://instagram.com" aria-label="Instagram">
          <FaInstagram className="text-2xl" />
        </Link>
      </div>
    </footer>
  );
}

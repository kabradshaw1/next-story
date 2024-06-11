import Link from 'next/link';
import { FaTwitter, FaFacebook, FaEnvelope, FaInstagram } from 'react-icons/fa';

export default function Footer(): JSX.Element {
  return (
    <footer>
      <h1>Footer</h1>
      <div className="flex justify-end">
        <Link href="https://twitter.com" aria-label="Twitter">
          <FaTwitter />
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

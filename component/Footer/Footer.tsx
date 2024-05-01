import { FaTwitter, FaFacebook, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <h1>Footer</h1>
      <div className='flex '>
        <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
        <a href="mailto:example@example.com" aria-label="Mail"><FaEnvelope /></a>
      </div>
    </footer>
  );
}

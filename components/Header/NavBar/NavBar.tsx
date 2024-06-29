import Link from 'next/link';

export default function NavBar(): JSX.Element {
  return (
    <nav className="flex justify-start items-center py-4">
      <Link className="dark-gray" href="/">
        Galaxy Voyagers
      </Link>
    </nav>
  );
}

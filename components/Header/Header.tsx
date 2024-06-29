import Dropdown from '@/components/Header/Dropdown/Dropdown';

import NavBar from './NavBar/NavBar';

export default function Header(): JSX.Element {
  return (
    <header className="flex justify-between items-center p-4">
      <NavBar />
      <Dropdown />
    </header>
  );
}

import Dropdown from '@/components/Header/Dropdown';

import NavBar from './NavBar/NavBar';

export default function Header(): JSX.Element {
  return (
    <header className="">
      <NavBar />
      <Dropdown />
    </header>
  );
}

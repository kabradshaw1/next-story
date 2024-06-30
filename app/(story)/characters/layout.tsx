import Logo from '@/components/Logo/Logo';

export default function CharacterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="w-full max-w-lg bg-dark-gray lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="hidden lg:block">
        <Logo />
        <p>
          The characters in galaxy voyagers are all made by fans. Anyone can
          create a character. The characters will be made cannon.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}

import Logo from '@/components/Logo/Logo';

export default function CharacterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="container mx-auto p-4 bg-dark-gray">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4">
        <div className="hidden lg:block">
          <Logo />
          <p>
            The characters in galaxy voyagers are all made by fans. Anyone can
            create a character. The characters will be made cannon, based on
            their popularity.
          </p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

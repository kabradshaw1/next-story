import Logo from '../Logo/Logo';

type StoryLayoutProps = {
  children: React.ReactNode;
  routeName: string;
};
export default function StoryLayout({
  children,
  routeName,
}: StoryLayoutProps): JSX.Element {
  return (
    <div className="container mx-auto p-4 bg-dark-gray">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4">
        <div className="hidden lg:block">
          <Logo />
          <p>
            The {routeName}s in galaxy voyagers are all made by fans. Anyone can
            create a {routeName}. And the most popular
            {routeName}s will be made cannon. Connon scenes will be featured in
            The Galaxy Voyager video game!
          </p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

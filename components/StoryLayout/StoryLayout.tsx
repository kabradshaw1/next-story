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
            The {routeName.toLowerCase()}s in galaxy voyagers are all made by
            fans. Anyone can create a {routeName.toLowerCase()}. The
            {routeName.toLowerCase()}s will be made cannon, based on their
            popularity.
          </p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

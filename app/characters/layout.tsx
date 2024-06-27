export default function CharacterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <div className="w-full max-w-lg">{children}</div>;
}

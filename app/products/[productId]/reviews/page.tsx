export default function Reviews({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Reviews</h1>
      {children}
    </div>
  );
}

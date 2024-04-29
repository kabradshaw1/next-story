export default function Docs({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      <h1>Docs</h1>
      <p>Docs go here {params.slug}</p>
    </div>
  );
}

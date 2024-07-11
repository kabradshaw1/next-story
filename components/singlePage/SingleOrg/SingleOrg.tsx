import LinksCard from '@/components/LinksCard/LinksCard';

type Props = {
  scenes: Array<{ title: string }>;
  locations: Array<{ title: string }>;
  conflicts: Array<{ title: string }>;
};

export default function SingleOrg({
  scenes,
  locations,
  conflicts,
}: Props): JSX.Element {
  return (
    <div className="card">
      <LinksCard title="Scenes" items={scenes} />
      <LinksCard title="Locations" items={locations} />
      <LinksCard title="Conflicts" items={conflicts} />
    </div>
  );
}

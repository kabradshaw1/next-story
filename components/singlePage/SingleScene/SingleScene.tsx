import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import { type SceneQuery } from '@/generated/graphql';

export default function SingleScene(props: SceneQuery): JSX.Element {
  const scene = props.scene;
  return (
    <div className="card">
      <ImageList alt="Scene" downloadURLs={scene?.downloadURLs ?? []} />
      <h2 className="label">{scene?.title}</h2>
      <p>{scene?.text}</p>
      <p>Created at: {scene?.createdAt}</p>
      <p>Created by: {scene?.user}</p>
      <LinksCard type="Organizations" items={scene?.organizations ?? []} />
      <LinksCard type="Locations" items={scene?.location ?? []} />
      <LinksCard type="Conflicts" items={scene?.conflicts ?? []} />
      <LinksCard type="Characters" items={scene?.characters ?? []} />
    </div>
  );
}

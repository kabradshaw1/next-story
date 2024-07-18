import Link from 'next/link';

import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import { type CharacterQuery } from '@/generated/graphql';
import { createSlug } from '@/lib/createSlug';

export default function SingleCharacter(props: CharacterQuery): JSX.Element {
  const character = props.character;

  if (character === null || character === undefined) {
    return <p>No data found</p>;
  }
  return (
    <div className="card">
      <ImageList
        alt="Character"
        downloadURLs={props.character?.downloadURLs ?? []}
      />
      <h2 className="label">{props.character?.title}</h2>
      <p>{props.character?.text}</p>
      <p>Created by: {props.character?.user}</p>
      <p>Created at: {props.character?.createdAt}</p>
      <LinksCard type="Scenes" items={props.character?.scenes ?? []} />
      <div className="card">
        <h3 className="label">Roles</h3>
        <div>
          {props.character?.roles?.map(
            (role) =>
              role !== null && (
                <Link
                  href={`/role/${createSlug(role.organization?.title)}`}
                  key={role.title}
                >
                  {role.title} of {role.organization?.title}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
}

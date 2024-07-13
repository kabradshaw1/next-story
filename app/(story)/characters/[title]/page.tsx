import { CharacterDocument, type CharacterQuery } from '@/generated/graphql';

import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import { slugToTitle } from '@/lib/createSlug';
import axiosInstance from '@/lib/serverAxios';
import type { Params } from '@/lib/types';

export default async function SingleCharacterPage({
  params,
}: Params): Promise<JSX.Element> {
  const { title: slug } = params;
  const title = slugToTitle(slug);

  const query = CharacterDocument;
  const response = await axiosInstance.post<{ data: CharacterQuery }>('', {
    query: query.loc?.source.body,
    variables: { title },
  });
  const character = response.data.data.character;

  return (
    <div className="card">
      <ImageList images={images} />
      <h2>{character.title}</h2>
      <p>{character.text}</p>
      <p>Created by: {character.user}</p>
      <p>Created at: {character.createdAt}</p>
      <LinksCard title="Scenes" items={character.scenes} />
      <LinksCard title="Roles" items={character.roles} />
    </div>
  );
}

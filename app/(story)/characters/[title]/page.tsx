import { gql } from 'graphql-tag';

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

  const query = gql`
    query character($title: String!) {
      character(title: $title) {
        title
        text
        createdAt
        user
        downloadURLs
        scenes {
          title
        }
        roles {
          title
        }
      }
    }
  `;

  const response = await axiosInstance.post('', {
    query: query.loc?.source.body,
    variables: { title },
  });
  const character = response.data.data.character;

  // Map the downloadURLs to the format expected by ImageList
  const images = character.downloadURLs.map((url: string) => ({
    imageUrl: url,
    alt: `${character.title} image`,
  }));

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

import { gql } from 'graphql-tag';
import Link from 'next/link';

import ImageList from '@/components/ImageList/ImageList';
import { slugToTitle, createSlug } from '@/lib/createSlug';
import axiosInstance from '@/lib/serverAxios';

type Props = {
  params: {
    title: string;
  };
};

export default async function SingleCharacterPage({
  params,
}: Props): Promise<JSX.Element> {
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
      <h3>Scenes</h3>
      <div className="card">
        {character.scenes.map((scene: { title: string }) => (
          <Link
            className="mr-1"
            href={`/scenes/${createSlug(scene.title)}`}
            key={scene.title}
          >
            {scene.title}
          </Link>
        ))}
      </div>
      <h3>Roles</h3>
      <div className="card">
        {character.roles.map((role: { title: string }) => (
          <Link
            className="mr-1"
            href={`/roles/${createSlug(role.title)}`}
            key={role.title}
          >
            {role.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

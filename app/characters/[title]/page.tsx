import { gql } from 'graphql-tag';

import ImageList from '@/components/main/ImageList/ImageList';
import axiosInstance from '@/lib/axios';
import { slugToTitle } from '@/lib/createSlug';

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
      <ul>
        {character.scenes.map((scene: { title: string }) => (
          <li key={scene.title}>{scene.title}</li>
        ))}
      </ul>
      <h3>Roles</h3>
      <ul>
        {character.roles.map((role: { title: string }) => (
          <li key={role.title}>{role.title}</li>
        ))}
      </ul>
    </div>
  );
}

import { gql } from 'graphql-tag';

import Lists from '@/components/main/Lists';
import axiosInstance from '@/lib/axios';

export default async function CharactersPage(): Promise<JSX.Element> {
  const query = gql`
    query Characters {
      characters {
        title
        downloadURLs
      }
    }
  `;
  const response = await axiosInstance.post('', {
    query: query.loc?.source.body,
  });

  const characters = response.data.data.characters.map(
    (character: { title: string; downloadURLs: string[] }) => {
      let imageUrl;
      if (
        character.downloadURLs !== null &&
        character.downloadURLs !== undefined
      ) {
        const randomIndex = Math.floor(
          Math.random() * character.downloadURLs.length
        );
        imageUrl = character.downloadURLs[randomIndex];
      }
      return {
        title: character.title,
        imageUrl,
      };
    }
  );

  return (
    <div className="card">
      <h2>Characters</h2>
      <Lists props={characters} route="characters" />
    </div>
  );
}

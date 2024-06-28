import { gql } from 'graphql-tag';

import axiosInstance from '@/lib/serverAxios';

export type Character = {
  title: string;
  imageUrl: string | undefined;
};

const fetchCharacters = async (): Promise<Character[]> => {
  const query = gql`
    query Characters {
      characters {
        title
        downloadURLs
      }
    }
  `;

  try {
    const response = await axiosInstance.post('', {
      query: query.loc?.source.body,
    });

    const characters = response.data.data.characters;

    return characters.map(
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchCharacters;

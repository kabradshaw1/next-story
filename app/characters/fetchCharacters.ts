import { gql } from 'graphql-tag';

import axiosInstance from '@/lib/serverAxios';

const fetchCharacters = async (): Promise<unknown> => {
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

    if (
      !response.data ||
      !response.data.data ||
      !response.data.data.characters
    ) {
      throw new Error('Invalid response structure');
    }

    return response.data.data.characters.map(
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

'use client';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-tag';
import { useParams } from 'next/navigation';

import axiosInstance from '@/lib/axios';
import { slugToTitle } from '@/lib/createSlug';

const fetchCharacter = async (title: string): Promise<unknown> => {
  console.log('fetching character', title);
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

  try {
    const response = await axiosInstance.post('', {
      query: query.loc?.source.body,
      variables: { title: 'Character 1' },
    });
    console.log('fetch data', response.data.data.character);
    return response.data.data.character;
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

export default function SingleCharacterPage(): JSX.Element {
  const { title: slug } = useParams<{ title: string }>();
  const title = slugToTitle(slug);

  const { data, error, isLoading } = useQuery({
    queryKey: ['character', title],
    queryFn: async () => await fetchCharacter(title),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  console.log('query data', data);

  return <div></div>;
}

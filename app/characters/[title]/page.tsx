'use client';
import { gql } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import axiosInstance from '@/lib/axios';
import { slugToTitle } from '@/lib/createSlug';

const fetchCharacter = async (title: string): Promise<unknown> => {
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

  const { data } = await axiosInstance.post('', {
    query: query.loc?.source.body,
    variables: { title },
  });
  console.log('fetch data', data.data.character);
  return data.data.character;
};

export default function SingleCharacterPage(): JSX.Element {
  const { title: slug } = useParams<{ title: string }>();
  const title = slugToTitle(slug);

  const { data, error, isLoading } = useQuery({
    queryKey: ['character', 'Character 1'],
    queryFn: async () => await fetchCharacter('Character 1'),
  });
  console.log('query data', data);
  return <></>;
}

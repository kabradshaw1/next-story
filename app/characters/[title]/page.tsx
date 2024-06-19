'use client';
import { gql } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

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

  const { data } = await axios.post('', {
    query,
    variables: { title },
  });

  return data.data.character;
};

export default function SingleCharacterPage(): JSX.Element {
  const { title: slug } = useParams<{ title: string }>();
  const title = slugToTitle(slug);

  const { data, error, isLoading } = useQuery(
    [title],
    async () => await fetchCharacter(title)
  );

  return <></>;
}

// const { title: slug } = useParams<{ title: string }>();
// const title = slugToTitle(slug);
// console.log('title', title);
// const { data, error, loading } = useCharacterQuery({
//   variables: { title: 'Character 1' },
// });
// console.log('characters', data, error, loading);

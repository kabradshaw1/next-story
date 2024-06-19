'use client';
import { gql } from '@apollo/client';
import { useParams } from 'next/navigation';

import { slugToTitle } from '@/lib/createSlug';

export default function SingleCharacterPage(): JSX.Element {
  const { title: slug } = useParams<{ title: string }>();
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

  return <></>;
}

// const { title: slug } = useParams<{ title: string }>();
// const title = slugToTitle(slug);
// console.log('title', title);
// const { data, error, loading } = useCharacterQuery({
//   variables: { title: 'Character 1' },
// });
// console.log('characters', data, error, loading);

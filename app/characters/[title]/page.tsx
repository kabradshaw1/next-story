'use client';

import { gql } from '@apollo/client';
import { useParams } from 'next/navigation';

import { slugToTitle } from '@/lib/createSlug';

// Having an issue here that
export default function SingleCharacterPage(): JSX.Element {
  const query = gql``;

  return <></>;
}

// const { title: slug } = useParams<{ title: string }>();
// const title = slugToTitle(slug);
// console.log('title', title);
// const { data, error, loading } = useCharacterQuery({
//   variables: { title: 'Character 1' },
// });
// console.log('characters', data, error, loading);

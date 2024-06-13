'use client';

import { useParams } from 'next/navigation';

import { useCharacterQuery } from '@/generated/graphql';
import { slugToTitle } from '@/lib/createSlug';

export default function SingleCharacterPage(): JSX.Element {
  const { title: slug } = useParams<{ title: string }>();
  const title = slugToTitle(slug);
  const { data } = useCharacterQuery({ variables: { title } });
  console.log('characters', data);
  return <></>;
}

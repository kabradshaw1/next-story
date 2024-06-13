'use client';

import { useParams } from 'next/navigation';

import { useCharacterQuery } from '@/generated/graphql';

export default function SingleCharacterPage(): JSX.Element {
  const { title } = useParams<{ title: string }>();
  const { data } = useCharacterQuery({ variables: { title } });
  console.log('characters', data);
  return <></>;
}

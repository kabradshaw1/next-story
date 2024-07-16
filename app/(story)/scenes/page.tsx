import Link from 'next/link';

import List from '@/components/main/List';
import ScenesTimeline from '@/components/ScenesTimeline/ScenesTimeline';
import { ScenesDocument, type ScenesQuery } from '@/generated/graphql';
import axiosInstance from '@/lib/serverAxios';

export default async function ScenesPage(): Promise<JSX.Element> {
  const query = ScenesDocument;

  const response = await axiosInstance.post<{ data: ScenesQuery }>('', {
    query: query.loc?.source.body,
  });

  const scenes = response.data.data;
  return <p>Under contruciton</p>;
}

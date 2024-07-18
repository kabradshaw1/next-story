import { Suspense } from 'react';

import ButtonAndPopup from '@/components/ButtonAndPopup/ButtonAndPopup';
import List from '@/components/main/List';
import ListHeader from '@/components/main/ListHeader/ListHeader';
import ScenesTimeline from '@/components/ScenesTimeline/ScenesTimeline';
import { ScenesDocument, type ScenesQuery } from '@/generated/graphql';
import { mapDataToItems } from '@/lib/fetchList';
import axiosInstance from '@/lib/serverAxios';

export default async function ScenesPage(): Promise<JSX.Element> {
  const query = ScenesDocument;

  const response = await axiosInstance.post<{ data: ScenesQuery }>('', {
    query: query.loc?.source.body,
  });

  const scenes =
    response.data.data.scenes?.filter(
      (scene): scene is NonNullable<typeof scene> => scene !== null
    ) ?? [];

  const props = mapDataToItems(scenes);

  return (
    <div className="container mx-auto mt-8">
      <ListHeader title="scene" />
      <Suspense fallback={<div>Loading...</div>}>
        <ButtonAndPopup>
          <ScenesTimeline {...response.data.data} />
        </ButtonAndPopup>
      </Suspense>
      <div>
        <List props={props} route="scenes" />
      </div>
    </div>
  );
}

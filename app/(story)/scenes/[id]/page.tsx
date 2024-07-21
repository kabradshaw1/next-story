import SingleScene from '@/components/singlePage/SingleScene/SingleScene';
import { SceneDocument, type SceneQuery } from '@/generated/graphql';
import axiosInstance from '@/lib/serverAxios';
import type { Params } from '@/lib/types';

export default async function singleScenePage({
  params,
}: Params): Promise<JSX.Element> {
  const { id: stringId } = params;

  const id = parseInt(stringId);

  const query = SceneDocument;

  const response = await axiosInstance.post<{ data: SceneQuery }>('', {
    query: query.loc?.source.body,
    variables: { id },
  });

  const scene = response.data.data;

  return <SingleScene {...scene} />;
}

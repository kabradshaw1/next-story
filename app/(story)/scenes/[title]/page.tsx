import SingleScene from '@/components/singlePage/SingleScene/SingleScene';
import { SceneDocument, type SceneQuery } from '@/generated/graphql';
import { slugToTitle } from '@/lib/createSlug';
import axiosInstance from '@/lib/serverAxios';
import type { Params } from '@/lib/types';

export default async function singleScenePage({
  params,
}: Params): Promise<JSX.Element> {
  const { title: slug } = params;
  const title = slugToTitle(slug);

  const query = SceneDocument;

  const response = await axiosInstance.post<{ data: SceneQuery }>('', {
    query: query.loc?.source.body,
    variables: { title },
  });

  const scene = response.data.data;

  return <SingleScene {...scene} />;
}

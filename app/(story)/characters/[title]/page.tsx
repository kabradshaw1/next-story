import SingleCharacter from '@/components/singlePage/SingleCharacter/SingleCharacter';
import { CharacterDocument, type CharacterQuery } from '@/generated/graphql';
import { slugToTitle } from '@/lib/createSlug';
import axiosInstance from '@/lib/serverAxios';
import type { Params } from '@/lib/types';

export default async function SingleCharacterPage({
  params,
}: Params): Promise<JSX.Element> {
  const { title: slug } = params;
  const title = slugToTitle(slug);

  const query = CharacterDocument;

  const response = await axiosInstance.post<{ data: CharacterQuery }>('', {
    query: query.loc?.source.body,
    variables: { title },
  });
  const character = response.data.data;

  return <SingleCharacter {...character} />;
}

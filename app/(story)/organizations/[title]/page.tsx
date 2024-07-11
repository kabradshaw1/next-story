import SingleOrg from '@/components/singlePage/SingleOrg/SingleOrg';
import {
  OrganizationDocument,
  type OrganizationQuery,
} from '@/generated/graphql';
import { slugToTitle } from '@/lib/createSlug';
import axiosInstance from '@/lib/serverAxios';
import type { Params } from '@/lib/types';

export default async function singleOrganizationPage({
  params,
}: Params): Promise<JSX.Element> {
  const { title: slug } = params;
  const title = slugToTitle(slug);

  const query = OrganizationDocument;

  const response = await axiosInstance.post<{ data: OrganizationQuery }>('', {
    query: query.loc?.source.body,
    variables: { title },
  });

  const organization = response.data.data;

  return <SingleOrg {...organization} />;
}

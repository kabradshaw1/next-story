import { gql } from 'graphql-tag';

import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import { slugToTitle } from '@/lib/createSlug';
import axiosInstance from '@/lib/serverAxios';
import type { Params } from '@/lib/types';

export default async function singleOrganizationPage({
  params,
}: Params): Promise<JSX.Element> {
  const { title: slug } = params;
  const title = slugToTitle(slug);

  const query = gql`
    query organization($title: String!) {
      organization(title: $title) {
        title
        text
        createdAt
        user
        downloadURLs
        scenes {
          title
        }
        conflicts {
          title
        }
        headquarters {
          title
        }
        locations {
          title
        }
        roles {
          title
          superior
          subordinates
        }
      }
    }
  `;

  const response = await axiosInstance.post('', {
    query: query.loc?.source.body,
    variables: { title },
  });

  const character = response.data.data.organization;

  return <></>;
}

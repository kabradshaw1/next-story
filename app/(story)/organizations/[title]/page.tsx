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
          superior {
            title
          }
          subordinates {
            title
          }
        }
      }
    }
  `;

  const response = await axiosInstance.post('', {
    query: query.loc?.source.body,
    variables: { title },
  });

  const organization = response.data.data.organization;

  const images = organization.downloadURLs.map((url: string) => ({
    imageUrl: url,
    alt: `${organization.title} image`,
  }));

  return (
    <div className="card">
      <ImageList images={images} />
      <h2>{organization.title}</h2>
      <p>{organization.text}</p>
      <p>{organization.headquerters}</p>
      <p>Created by: {organization.user}</p>
      <p>Created at: {organization.createdAt}</p>
      <LinksCard title="Scenes" items={organization.scenes} />
      <LinksCard title="Locations" items={organization.locations} />
      <LinksCard title="Conflicts" items={organization.conflicts} />
    </div>
  );
}

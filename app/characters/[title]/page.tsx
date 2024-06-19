import { gql } from 'graphql-tag';

import axiosInstance from '@/lib/axios';
import { slugToTitle } from '@/lib/createSlug';

type Props = {
  params: {
    title: string;
  };
};

export default async function SingleCharacterPage({
  params,
}: Props): Promise<JSX.Element> {
  const { title: slug } = params;
  const title = slugToTitle(slug);
  console.log(title);
  const query = gql`
    query character($title: String!) {
      character(title: $title) {
        title
        text
        createdAt
        user
        downloadURLs
        scenes {
          title
        }
        roles {
          title
        }
      }
    }
  `;

  const response = await axiosInstance.post('', {
    query: query.loc?.source.body,
    variables: { title },
  });
  console.log(response.data.data.character);
  return <div></div>;
}

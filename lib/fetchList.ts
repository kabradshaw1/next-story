import { gql } from 'graphql-tag';

import axiosInstance from '@/lib/serverAxios';

export type Item = {
  title: string;
  imageUrl: string | undefined;
};

const fetchList = async (field: string): Promise<Item[]> => {
  const query = gql`
    query FetchList {
      ${field} {
        title
        downloadURLs
      }
    }
  `;

  try {
    const response = await axiosInstance.post('', {
      query: query.loc?.source.body,
    });

    const data = response.data.data[field];

    return data.map((item: { title: string; downloadURLs: string[] }) => {
      let imageUrl;
      if (item.downloadURLs !== null && item.downloadURLs !== undefined) {
        const randomIndex = Math.floor(
          Math.random() * item.downloadURLs.length
        );
        imageUrl = item.downloadURLs[randomIndex];
      }
      return {
        title: item.title,
        imageUrl,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchList;

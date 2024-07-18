import { gql } from 'graphql-tag';

import axiosInstance from '@/lib/serverAxios';

export type Item = {
  title: string;
  imageUrl: string | undefined;
};

// Function to map data
export const mapDataToItems = (
  data: Array<{ title: string; downloadURLs?: Array<string | null> | null }>
): Item[] => {
  return data.map((item) => {
    let imageUrl: string | undefined;
    if (
      item.downloadURLs !== undefined &&
      item.downloadURLs !== null &&
      item.downloadURLs.length > 0
    ) {
      const validUrls = item.downloadURLs.filter(
        (url): url is string => url !== null
      );
      if (validUrls.length > 0) {
        const randomIndex = Math.floor(Math.random() * validUrls.length);
        imageUrl = validUrls[randomIndex];
      }
    }
    return {
      title: item.title,
      imageUrl,
    };
  });
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

    const data = response.data.data[field] as Array<{
      title: string;
      downloadURLs: string[];
    }>;

    return mapDataToItems(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchList;

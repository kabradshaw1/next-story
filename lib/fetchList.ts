import { gql } from 'graphql-tag';

import axiosInstance from '@/lib/serverAxios';

export type Item = {
  title: string;
  imageUrl: string | undefined;
  id: number;
};

// Function to map data
export const mapDataToItems = (
  data: Array<{
    title: string;
    downloadURLs?: Array<string | null> | null;
    id: number;
  }>
): Item[] => {
  console.log(process.env.NEXT_PUBLIC_STORY_URL);
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
      id: item.id,
    };
  });
};

const fetchList = async (field: string): Promise<Item[]> => {
  const query = gql`
    query FetchList {
      ${field} {
        title
        id
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
      id: number;
    }>;

    return mapDataToItems(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchList;

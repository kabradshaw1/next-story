import fetchList, { type Item } from '@/lib/fetchList';

const fetchCharacters = async (): Promise<Item[]> => {
  return await fetchList('characters');
};

export default fetchCharacters;

import fetchList, { type Item } from '@/lib/fetchList';

const fetchOrganizations = async (): Promise<Item[]> => {
  return await fetchList('organizations');
};

export default fetchOrganizations;

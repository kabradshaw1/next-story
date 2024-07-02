import type { Dispatch, SetStateAction } from 'react';

import { useForOrganizationFormQuery } from '@/generated/graphql';

type Props = {
  selectedConflicts: number[];
  setSelectedConflicts: Dispatch<SetStateAction<number[]>>;
  selectedLocations: number[];
  setSelectedLocations: Dispatch<SetStateAction<number[]>>;
  selectedHeadquarters: number;
  setSelectedHeadquarters: Dispatch<SetStateAction<number>>;
};

export default function OrgClickLists({
  selectedConflicts,
  setSelectedConflicts,
  selectedLocations,
  setSelectedLocations,
  selectedHeadquarters,
  setSelectedHeadquarters,
}: Props): JSX.Element {
  const { data, loading, error } = useForOrganizationFormQuery();

  const locations = data?.locations;

  const conflicts = data?.conflicts;

  if (loading) return <p>Loading...</p>;
  if (error !== null && error !== undefined) {
    return <p>Error: {error?.message}</p>;
  }
  return <></>;
}

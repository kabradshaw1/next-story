import type { Dispatch, SetStateAction } from 'react';

import CheckBoxList from '@/components/CheckBoxList/CheckBoxList';
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

  const locations = data?.locations?.map((location) => ({
    id: location?.id ?? 0,
    title: location?.title ?? '',
  }));

  const conflicts = data?.conflicts?.map((conflict) => ({
    id: conflict?.id ?? 0,
    title: conflict?.title ?? '',
  }));

  if (loading) return <p>Loading...</p>;
  if (error !== null && error !== undefined) {
    return <p>Error: {error?.message}</p>;
  }
  return (
    <>
      {conflicts !== undefined && (
        <CheckBoxList
          data={conflicts}
          selected={selectedConflicts}
          setSelected={setSelectedConflicts}
          idPrefix="conflict"
        />
      )}
      {locations !== undefined && (
        <CheckBoxList
          data={locations}
          selected={selectedLocations}
          setSelected={setSelectedLocations}
          idPrefix="location"
        />
      )}
    </>
  );
}

'use client';
import type { Dispatch, SetStateAction } from 'react';

import CheckBoxList from '@/components/CheckBoxList/CheckBoxList';
import { useForOrganizationFormQuery } from '@/generated/graphql';

import HeadquartersDropdown from './HeadquartersDowndown';

type Props = {
  selectedConflicts: number[];
  setSelectedConflicts: Dispatch<SetStateAction<number[]>>;
  selectedLocations: number[];
  setSelectedLocations: Dispatch<SetStateAction<number[]>>;
  selectedHeadquarters: number | undefined;
  setSelectedHeadquarters: Dispatch<SetStateAction<number | undefined>>;
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

  if (loading) return <p>Loading...</p>;
  if (error !== null && error !== undefined) {
    return <p>Error: {error?.message}</p>;
  }

  const locations = data?.locations?.map((location) => ({
    id: location?.id ?? 0,
    title: location?.title ?? '',
  }));

  const conflicts = data?.conflicts?.map((conflict) => ({
    id: conflict?.id ?? 0,
    title: conflict?.title ?? '',
  }));

  const availableLocations = locations?.filter(
    (location) => location.id !== selectedHeadquarters
  );

  return (
    <>
      <h3>Conflicts</h3>
      {conflicts !== undefined && (
        <CheckBoxList
          data={conflicts}
          selected={selectedConflicts}
          setSelected={setSelectedConflicts}
          idPrefix="conflict"
        />
      )}
      <h3>Headquarters</h3>
      {availableLocations !== undefined && (
        <CheckBoxList
          data={availableLocations}
          selected={selectedLocations}
          setSelected={setSelectedLocations}
          idPrefix="location"
        />
      )}
      <h3>Locations</h3>
      {locations !== undefined && (
        <HeadquartersDropdown
          data={locations}
          selected={selectedHeadquarters}
          setSelected={setSelectedHeadquarters}
        />
      )}
    </>
  );
}

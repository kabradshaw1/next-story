'use client';
import type { Dispatch, SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CheckBoxList from '@/components/CheckBoxList/CheckBoxList';
import { useForSceneFormQuery } from '@/generated/graphql';

type Props = {
  selectedCharacters: number[];
  setSelectedCharacters: Dispatch<SetStateAction<number[]>>;
  selectedLocations: number[];
  setSelectedLocations: Dispatch<SetStateAction<number[]>>;
  selectedOrganizations: number[];
  setSelectedOrganizations: Dispatch<SetStateAction<number[]>>;
  selectedConflicts: number[];
  setSelectedConflicts: Dispatch<SetStateAction<number[]>>;
  selectedShipsPopulation: Array<{ population: number; shipId: number }>;
  setSelectedShips: Dispatch<SetStateAction<number[]>>;
};

export default function SceneClickLists({
  selectedCharacters,
  setSelectedCharacters,
  selectedLocations,
  setSelectedLocations,
  selectedOrganizations,
  setSelectedOrganizations,
  selectedConflicts,
  setSelectedConflicts,
}: Props): JSX.Element {
  const { data, loading, error } = useForSceneFormQuery();

  if (loading) return <p>Loading...</p>;
  if (error !== null && error !== undefined) {
    return <p>Error: {error?.message}</p>;
  }

  const locations = data?.locations?.map((location) => ({
    id: location?.id ?? 0,
    title: location?.title ?? '',
  }));

  const organizations = data?.organizations?.map((organization) => ({
    id: organization?.id ?? 0,
    title: organization?.title ?? '',
  }));

  const characters = data?.characters?.map((character) => ({
    id: character?.id ?? 0,
    title: character?.title ?? '',
  }));

  const conflicts = data?.conflicts?.map((conflict) => ({
    id: conflict?.id ?? 0,
    title: conflict?.title ?? '',
  }));

  const ship = data?.ships?.map((ship) => ({
    id: ship?.id ?? 0,
    title: ship?.title ?? '',
  }));

  return (
    <>
      <h3 className="label">Locations</h3>
      {locations !== undefined && (
        <CheckBoxList
          data={locations}
          selected={selectedLocations}
          setSelected={setSelectedLocations}
          idPrefix="location"
        />
      )}
      <h3 className="label">Organizations</h3>
      {organizations !== undefined && (
        <CheckBoxList
          data={organizations}
          selected={selectedOrganizations}
          setSelected={setSelectedOrganizations}
          idPrefix="organization"
        />
      )}
      <h3 className="label">Characters</h3>
      {characters !== undefined && (
        <CheckBoxList
          data={characters}
          selected={selectedCharacters}
          setSelected={setSelectedCharacters}
          idPrefix="character"
        />
      )}
      <h3 className="label">Conflicts</h3>
      {conflicts !== undefined && (
        <CheckBoxList
          data={conflicts}
          selected={selectedConflicts}
          setSelected={setSelectedConflicts}
          idPrefix="conflict"
        />
      )}
      <h3 className="label">Ship Population Changes</h3>
      <div className="flex flex-col max-w-md">
        <input
          type="text"
          placeholder="population"
          className="mb-4 p-2 border rounded"
          onChange={(e) => {}}
        />
      </div>
    </>
  );
}

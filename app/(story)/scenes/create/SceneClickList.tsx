'use client';
import { useState, type Dispatch, type SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CheckBoxList from '@/components/CheckBoxList/CheckBoxList';
import InputField from '@/components/main/forms/FormInput/InputField';
import { useForSceneFormQuery } from '@/generated/graphql';

const populationChangeSchema = z.object({
  population: z.number().int(),
  shipId: z.number().int(),
});

export type PopulationChange = z.infer<typeof populationChangeSchema>;

type Props = {
  selectedCharacters: number[];
  setSelectedCharacters: Dispatch<SetStateAction<number[]>>;
  selectedLocations: number[];
  setSelectedLocations: Dispatch<SetStateAction<number[]>>;
  selectedOrganizations: number[];
  setSelectedOrganizations: Dispatch<SetStateAction<number[]>>;
  selectedConflicts: number[];
  setSelectedConflicts: Dispatch<SetStateAction<number[]>>;
  selectedShipsPopulation: PopulationChange[];
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

  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    getValues,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<PopulationChange>({
    resolver: zodResolver(populationChangeSchema),
    mode: 'onChange',
  });

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

  const formSubmit = (): void => {
    const data = getValues();
    const population = { ...data };
  };

  const clearState = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setMessage('Populations Cleared and Not Submitted');
    reset();
  };

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
      <div className="w-full max-w-lg">
        <div className="card">
          <InputField<PopulationChange>
            id="shipId"
            label="Ship"
            placeholder="Enter Ship"
            error={errors.shipId?.message}
            register={register}
            trigger={trigger}
            readOnly={true}
          />
          <InputField<PopulationChange>
            id="population"
            label="Population"
            placeholder="Enter Population"
            error={errors.population?.message}
            register={register}
            trigger={trigger}
          />
          {message !== null && <p className="mt-2 text-center">{message}</p>}
        </div>
      </div>
    </>
  );
}

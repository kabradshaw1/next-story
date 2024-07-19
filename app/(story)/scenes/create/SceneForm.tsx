'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import CommonForm from '@/components/CommonForm/CommonForm';
import FileUploader from '@/components/main/forms/FileUploader/FileUploader';
import InputField from '@/components/main/forms/FormInput/InputField';
import { useCreateSceneMutation } from '@/generated/graphql';
import { addScene } from '@/lib/store/slices/sceneSlice';
import { useAppDispatch } from '@/lib/store/store';

import SceneClickLists, { type PopulationChange } from './SceneClickLists';

const validationSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  text: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
  endTimeline: z.number().int(),
  startTimeline: z.number().int(),
  locations: z.array(z.number()).optional(),
  conflicts: z.array(z.number()).optional(),
  characters: z.array(z.number()).optional(),
  organizations: z.array(z.number()).optional(),
  populations: z
    .array(
      z.object({
        population: z.number().int(),
        shipId: z.number().int(),
        shipName: z.string(),
      })
    )
    .optional(),
});

type SceneProps = z.infer<typeof validationSchema>;

export default function SceneForm(): JSX.Element {
  const [createScene] = useCreateSceneMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedConflicts, setSelectedConflicts] = useState<number[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<number[]>(
    []
  );
  const [selectedShipsPopulation, setSelectedShipsPopulation] = useState<
    PopulationChange[]
  >([]);
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit: SubmitHandler<SceneProps> = async (data) => {
    const fileInputs =
      data.files?.map((file) => ({
        fileName: file.name,
        contentType: file.type,
      })) ?? [];

    const response = await createScene({
      variables: {
        title: data.title,
        text: data.text,
        files: fileInputs,
        endTimeline: data.endTimeline,
        startTimeline: data.startTimeline,
        locationIds: selectedLocations,
        conflictIds: selectedConflicts,
        characterIds: selectedCharacters,
        organizationIds: selectedOrganizations,
        populations: selectedShipsPopulation.map((pop) => {
          return {
            population: pop.population,
            shipId: pop.shipId,
          };
        }),
      },
    });

    if (
      response.data?.createScene?.uploadURLs !== null &&
      response.data?.createScene?.uploadURLs !== undefined
    ) {
      const { uploadURLs, ...sceneData } = response.data.createScene;
      const imageUrls = data.files?.map((file) => URL.createObjectURL(file));
      dispatch(addScene({ scene: sceneData, images: imageUrls ?? [] }));
      const uploadPromises = data.files?.map(async (file, index) => {
        const uploadUrl = uploadURLs[index];
        if (uploadUrl !== null) {
          await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
          });
        }
      });
      if (uploadPromises !== undefined && uploadPromises.length > 0) {
        await Promise.all(uploadPromises);
      }
      router.push('/scene/create/review');
    }
  };

  return (
    <CommonForm<SceneProps>
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ register, trigger, setValue, errors }) => (
        <div className="mb-4">
          <InputField<SceneProps>
            label="Title"
            id="title"
            placeholder="Title"
            register={register}
            error={errors.title?.message}
            trigger={trigger}
          />
          <InputField<SceneProps>
            label="Text"
            id="text"
            placeholder="Text"
            register={register}
            error={errors.text?.message}
            trigger={trigger}
          />
          <InputField<SceneProps>
            label="End Timeline"
            id="endTimeline"
            placeholder="End Timeline"
            register={register}
            error={errors.endTimeline?.message}
            trigger={trigger}
          />
          <InputField<SceneProps>
            label="Start Timeline"
            id="startTimeline"
            placeholder="Start Timeline"
            register={register}
            error={errors.startTimeline?.message}
            trigger={trigger}
          />
          <FileUploader
            files={files}
            setFiles={setFiles}
            setValue={setValue}
            error={errors.files?.message}
          />
          <SceneClickLists
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            selectedConflicts={selectedConflicts}
            setSelectedConflicts={setSelectedConflicts}
            selectedCharacters={selectedCharacters}
            setSelectedCharacters={setSelectedCharacters}
            selectedOrganizations={selectedOrganizations}
            setSelectedOrganizations={setSelectedOrganizations}
            selectedShipsPopulation={selectedShipsPopulation}
            setSelectedShipsPopulation={setSelectedShipsPopulation}
          />
        </div>
      )}
    </CommonForm>
  );
}

'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import CommonForm from '@/components/CommonForm/CommonForm';
import FileUploader from '@/components/main/forms/FileUploader/FileUploader';
import InputField from '@/components/main/forms/FormInput/InputField';
import { useCreateCharacterMutation } from '@/generated/graphql';
import { addChar } from '@/lib/store/slices/charSlice';
import { useAppDispatch } from '@/lib/store/store';

import Roles from './Roles';

const validationSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  text: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
  roles: z.array(z.number()).optional(),
});

type CharacterProps = z.infer<typeof validationSchema>;

export default function CharacterForm(): JSX.Element {
  const [createCharacter] = useCreateCharacterMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const formSubmit: SubmitHandler<CharacterProps> = async (data) => {
    const fileInputs =
      data.files?.map((file) => ({
        fileName: file.name,
        contentType: file.type,
      })) ?? [];

    const response = await createCharacter({
      variables: {
        title: data.title,
        text: data.text,
        files: fileInputs,
        roleIds: selectedRoles,
      },
    });
    console.log(response);
    if (
      response.data?.createCharacter?.uploadURLs !== null &&
      response.data?.createCharacter?.uploadURLs !== undefined
    ) {
      const { uploadURLs, ...charData } = response.data.createCharacter;
      const imageUrls = data.files?.map((file) => URL.createObjectURL(file));
      dispatch(addChar({ character: charData, images: imageUrls ?? [] }));
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

      router.push('/characters/create/review');
    }
  };

  return (
    <>
      <CommonForm<CharacterProps>
        validationSchema={validationSchema}
        onSubmit={formSubmit}
        initialFiles={[]}
      >
        {({ register, trigger, setValue, errors }) => (
          <div className="mb-4">
            <InputField<CharacterProps>
              id="title"
              label="Name"
              placeholder="Name"
              error={errors.title?.message}
              register={register}
              trigger={trigger}
            />

            <InputField<CharacterProps>
              id="text"
              label="Back Ground"
              placeholder="Description"
              error={errors.text?.message}
              register={register}
              trigger={trigger}
            />
            <FileUploader
              files={files}
              setFiles={setFiles}
              setValue={setValue}
              error={errors.files?.message}
            />
            <label id="roles-label" htmlFor="roles" className="label mt-4">
              Roles
            </label>
            <div aria-labelledby="roles-label">
              <Roles
                selectedRoles={selectedRoles}
                setSelectedRoles={setSelectedRoles}
              />
            </div>
          </div>
        )}
      </CommonForm>
    </>
  );
}

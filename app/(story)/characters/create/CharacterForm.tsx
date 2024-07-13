'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/main/forms/FormInput/InputField';
import CommonForm from '@/components/MainForm/CommonForm';
import { useCreateCharacterMutation } from '@/generated/graphql';
import { useAppSelector, useAppDispatch } from '@/lib/store/store';

import Roles from './Roles';

const validationSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  text: z.string().min(1, 'Description is required'),
  files: z.array(z.instanceof(File)).optional(),
  roles: z.array(z.number()).optional(),
});

type CharacterProps = z.infer<typeof validationSchema>;

export default function CharacterForm(): JSX.Element {
  const [createCharacter, { error }] = useCreateCharacterMutation();
  const router = useRouter();
  const { character } = useAppSelector((state) => state.character);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const formSubmit: SubmitHandler<CharacterProps> = async (data) => {
    setLoading(true);

    try {
      const fileInputs = files.map((file) => ({
        fileName: file.name,
        contentType: file.type,
      }));

      const response = await createCharacter({
        variables: {
          title: data.title,
          text: data.text,
          files: fileInputs,
          roleIds: selectedRoles,
        },
      });

      if (
        response.data?.createCharacter?.uploadURLs !== null &&
        response.data?.createCharacter?.uploadURLs !== undefined
      ) {
        const uploadURLs = response.data.createCharacter.uploadURLs;
        const uploadPromises = files.map(async (file, index) => {
          const uploadUrl = uploadURLs[index];
          if (uploadUrl !== null) {
            await fetch(uploadUrl, {
              method: 'PUT',
              body: file,
            });
          }
        });

        await Promise.all(uploadPromises);
        router.push('/characters');
      }
    } catch (e) {
      console.log(e);
      if (error?.message !== undefined) {
        setMessage(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <CommonForm<CharacterProps>
        validationSchema={validationSchema}
        onSubmit={formSubmit}
        initialFiles={files}
      >
        {({ register, errors }) => (
          <div className="mb-4">
            <InputField<CharacterProps>
              id="title"
              label="Name"
              placeholder="Name"
              error={errors.title?.message}
              register={register}
            />
            <InputField<CharacterProps>
              id="text"
              label="Back Ground"
              placeholder="Description"
              error={errors.text?.message}
              register={register}
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

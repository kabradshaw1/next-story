'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';
import FileUploader from '@/components/main/forms/FileUploader/FileUploader';
import InputField from '@/components/main/forms/FormInput/InputField';
import { useCreateCharacterMutation } from '@/generated/graphql';

import Roles from './Roles';

export default function CharacterForm(): JSX.Element {
  const [createCharacter, { error }] = useCreateCharacterMutation();

  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const validationSchema = z.object({
    title: z.string().min(1, 'Name is required'),
    text: z.string().min(1, 'Description is required'),
    files: z.array(z.instanceof(File)).optional(),
    roles: z.array(z.number()).optional(),
  });

  type CharacterProps = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CharacterProps>({
    resolver: zodResolver(validationSchema),
  });

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
          roleIds: data.roles,
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
      <div className="w-full max-w-lg">
        <form
          noValidate
          className="card"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(formSubmit)();
          }}
        >
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
            <FileUploader<CharacterProps>
              files={files}
              setFiles={setFiles}
              setValue={setValue}
              error={errors.files?.message}
            />
            <label htmlFor="roles" className="label mt-4">
              Roles
            </label>
            <Roles
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
            />
          </div>

          <button
            type="submit"
            className="btn glow-on-hover"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Character'}
          </button>
          {message !== null && <p className="mt-2 text-center">{message}</p>}
        </form>
      </div>
      <div className="w-full max-w-xs mt-4">
        <div className="card">
          <Logo />
        </div>
      </div>
    </>
  );
}

'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import FileUploader from '@/components/main/forms/FileUploader/FileUploader';
import InputField from '@/components/main/forms/FormInput/InputField';
import { useCreateOrganizationMutation } from '@/generated/graphql';

const RoleInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().optional(),
  superiorTitle: z.string().optional(),
  subordinatesTitles: z.array(z.string()).optional(),
});

type RoleInput = z.infer<typeof RoleInputSchema>;

const validationSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  text: z.string().min(1, 'Description is required'),
  files: z.array(z.instanceof(File)).optional(),
  roles: z.array(RoleInputSchema).optional(),
  locations: z.array(z.number()).optional(),
  conflicts: z.array(z.number()).optional(),
  headquarters: z.number().optional(),
});

type OrganizationProps = z.infer<typeof validationSchema>;
export default function OrganizationForm(): JSX.Element {
  const [createOrganization, { error }] = useCreateOrganizationMutation();

  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [roles, setRoles] = useState<RoleInput[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedConflicts, setSelectedConflicts] = useState<number[]>([]);
  const [selectedHeadquarters, setSelectedHeadquarters] = useState<number>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OrganizationProps>({
    resolver: zodResolver(validationSchema),
  });

  const formSubmit: SubmitHandler<OrganizationProps> = async (data) => {
    setLoading(true);
    try {
      const fileInputs = files.map((file) => ({
        fileName: file.name,
        contentType: file.type,
      }));

      const response = await createOrganization({
        variables: {
          title: data.title,
          text: data.text,
          files: fileInputs,
          roleCreate: roles.map((role) => ({
            title: role.title,
            text: role.text,
            superiorTitle: role.superiorTitle,
            subordinatesTitles: role.subordinatesTitles,
          })),
          locationIds: selectedLocations,
          conflictIds: selectedConflicts,
          headquartersId: selectedHeadquarters,
        },
      });

      if (
        response.data?.createOrganization?.uploadURLs !== null &&
        response.data?.createOrganization?.uploadURLs !== undefined
      ) {
        const uploadURLs = response.data.createOrganization.uploadURLs;
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
        router.push('/organizations');
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
          <InputField<OrganizationProps>
            id="title"
            label="Name"
            placeholder="Name"
            error={errors.title?.message}
            register={register}
          />
          <InputField<OrganizationProps>
            id="title"
            label="Back Ground"
            placeholder="Description"
            error={errors.title?.message}
            register={register}
          />
          <FileUploader<OrganizationProps>
            files={files}
            setFiles={setFiles}
            setValue={setValue}
            error={errors.files?.message}
          />
        </div>
        <button type="submit" className="btn glow-on-hover" disabled={loading}>
          {loading ? 'Creating...' : 'Create Organization'}
        </button>
        {message !== null && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}
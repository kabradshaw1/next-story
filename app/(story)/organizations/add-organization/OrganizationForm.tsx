'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import FileUploader from '@/components/main/forms/FileUploader/FileUploader';
import InputField from '@/components/main/forms/FormInput/InputField';
import { useCreateOrganizationMutation } from '@/generated/graphql';
import { removeAllRoles } from '@/lib/store/slices/rolesSlice';
import { useAppSelector, useAppDispatch } from '@/lib/store/store';

import ButtonForRoles from './ButtonForRoles';
import OrgClickLists from './OrgClickLists';

const validationSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  text: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
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
  const { roles } = useAppSelector((state) => state.roles);
  const dispatch = useAppDispatch();
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
    setMessage('');
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
        dispatch(removeAllRoles());
        router.push('/organizations');
      }
    } catch (e) {
      console.log(e);
      if (error?.message !== undefined) {
        setMessage(error.message);
      }
    } finally {
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
            id="text"
            label="Back Ground"
            placeholder="Description"
            register={register}
          />
          <FileUploader<OrganizationProps>
            files={files}
            setFiles={setFiles}
            setValue={setValue}
            error={errors.files?.message}
          />
          <OrgClickLists
            selectedConflicts={selectedConflicts}
            setSelectedConflicts={setSelectedConflicts}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            selectedHeadquarters={selectedHeadquarters}
            setSelectedHeadquarters={setSelectedHeadquarters}
          />
          <ButtonForRoles />
        </div>
        <button type="submit" className="btn glow-on-hover" disabled={loading}>
          {loading ? 'Creating...' : 'Create Organization'}
        </button>
        {message !== null && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}

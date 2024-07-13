'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/main/forms/FormInput/InputField';
import CommonForm from '@/components/MainForm/CommonForm';
import { useCreateOrganizationMutation } from '@/generated/graphql';
import { addOrg } from '@/lib/store/slices/orgSlice';
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
  const [createOrganization] = useCreateOrganizationMutation();
  const router = useRouter();
  const { roles } = useAppSelector((state) => state.roles);
  const dispatch = useAppDispatch();
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedConflicts, setSelectedConflicts] = useState<number[]>([]);
  const [selectedHeadquarters, setSelectedHeadquarters] = useState<number>();

  const onSubmit: SubmitHandler<OrganizationProps> = async (data) => {
    const fileInputs = data.files?.map((file) => ({
      fileName: file.name,
      contentType: file.type,
    }));

    const response = await createOrganization({
      variables: {
        title: data.title,
        text: data.text,
        files: fileInputs,
        roleCreate: roles.map((role) => ({
          title: role.roleTitle,
          text: role.text,
          superiorTitle: role.superiorTitle,
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
      const { uploadURLs, ...orgData } = response.data.createOrganization;
      const imageUrls = data.files?.map((file) => URL.createObjectURL(file));
      dispatch(addOrg({ organization: orgData, images: imageUrls ?? [] }));
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
    }
    dispatch(removeAllRoles());

    if (response.data?.createOrganization?.title !== undefined) {
      router.push('/organizations/create/review');
    } else {
      router.push('/organizations');
    }
  };

  return (
    <CommonForm<OrganizationProps>
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialFiles={[]}
    >
      {({ register, errors }) => (
        <div className="mb-4">
          <InputField<OrganizationProps>
            id="title"
            label="Name"
            placeholder="Name"
            register={register}
            error={errors.title?.message}
          />
          <InputField<OrganizationProps>
            id="text"
            label="Back Ground"
            placeholder="Description"
            register={register}
            error={errors.text?.message}
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
      )}
    </CommonForm>
  );
}

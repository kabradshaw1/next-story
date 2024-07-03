'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import InputField from '@/components/main/forms/FormInput/InputField';
import { addRole } from '@/lib/store/slices/rolesSlice';
import store from '@/lib/store/store';

import { RoleInputSchema, type RoleInput } from './OrganizationForm';

type RoleProps = {
  subordinatesTitles?: string[];
  superiorTitle?: string;
};

export default function RoleForm({
  subordinatesTitles,
  superiorTitle,
}: RoleProps): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RoleInput>({
    resolver: zodResolver(RoleInputSchema),
  });

  const [message, setMessage] = useState<string | null>(null);

  const formSubmit: SubmitHandler<RoleInput> = async (data) => {
    const role = { ...data, subordinatesTitles, superiorTitle };
    try {
      store.dispatch(addRole({ roles: [role] }));
      setMessage('Role added successfully');
    } catch (error) {
      setMessage('Error adding role');
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
        <InputField<RoleInput>
          id="title"
          label="Role"
          placeholder="Role description"
          error={errors.title?.message}
          register={register}
        />
        <InputField<RoleInput>
          id="text"
          label="Role Description"
          placeholder="Role description"
          error={errors.title?.message}
          register={register}
        />
        <button type="submit" className="btn glow-on-hover">
          Add Role
        </button>
        {message !== null && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}

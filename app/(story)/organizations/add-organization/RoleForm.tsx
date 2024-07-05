'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import InputField from '@/components/main/forms/FormInput/InputField';
import { addRole, removeAllRoles } from '@/lib/store/slices/rolesSlice';
import { useAppDispatch } from '@/lib/store/store';

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
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);

  const formSubmit: SubmitHandler<RoleInput> = (data) => {
    const role = { ...data, subordinatesTitles, superiorTitle };
    try {
      dispatch(addRole(role));
      setMessage('Role added successfully');
    } catch (error) {
      setMessage('Error adding role');
    }
  };

  const clearState = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(removeAllRoles());
  };

  return (
    <div className="w-full max-w-lg">
      <form
        noValidate
        className="card"
        onSubmit={handleSubmit(formSubmit)} // Directly call handleSubmit with formSubmit
      >
        <InputField<RoleInput>
          id="title"
          label="Role"
          placeholder="Role title"
          error={errors.title?.message}
          register={register}
        />
        <InputField<RoleInput>
          id="text"
          label="Role Description"
          placeholder="Role description"
          error={errors.text?.message}
          register={register}
        />
        <button type="submit" className="btn glow-on-hover mr-1">
          Add Role
        </button>
        <button onClick={clearState} className="btn glow-on-hover">
          Clear All Roles
        </button>
        {message !== null && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}

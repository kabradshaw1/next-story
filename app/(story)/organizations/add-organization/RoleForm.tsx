'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import InputField from '@/components/main/forms/FormInput/InputField';

import { RoleInputSchema, type RoleInput } from './OrganizationForm';

export default function RoleForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleInput>({
    resolver: zodResolver(RoleInputSchema),
  });

  const [message, setMessage] = useState<string | null>(null);

  const formSubmit: SubmitHandler<RoleInput> = async (data) => {
    console.log(data);
    setMessage('Role added successfully.');
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

'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/main/forms/FormInput/InputField';
import { addRole, removeAllRoles } from '@/lib/store/slices/rolesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';

const baseRoleInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().optional(),
  superiorTitle: z.string().optional(),
  subordinatesTitles: z.array(z.string()).optional(),
});

export type RoleInput = z.infer<typeof baseRoleInputSchema>;

export default function RoleForm(): JSX.Element {
  const { roles } = useAppSelector((state) => state.roles);
  const existingTitles = roles.map((role) => role.title);

  const RoleInputSchema = baseRoleInputSchema.refine(
    (data) => !existingTitles.includes(data.title),
    {
      message: 'Title must be unique',
      path: ['title'],
    }
  );

  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm<RoleInput>({
    resolver: zodResolver(RoleInputSchema),
    mode: 'onChange', // Enable validation on change
  });
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);

  const formSubmit = (): void => {
    const data = getValues();
    const role = { ...data };
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
      <div className="card">
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
        <InputField<RoleInput>
          id="superiorTitle"
          label="Superior Role"
          placeholder="Superior Role Title"
          error={errors.superiorTitle?.message}
          register={register}
        />
        <button
          type="button"
          className="btn glow-on-hover mr-1"
          onClick={(e) => {
            e.preventDefault();
            formSubmit();
          }}
          disabled={!isValid} // Disable button if form is invalid
        >
          Add Role
        </button>
        <button
          type="button"
          onClick={clearState}
          className="btn glow-on-hover"
        >
          Clear All Roles
        </button>
        {message !== null && <p className="mt-2 text-center">{message}</p>}
      </div>
    </div>
  );
}

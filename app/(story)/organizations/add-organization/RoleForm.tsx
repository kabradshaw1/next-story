'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/main/forms/FormInput/InputField';
import { addRole, removeAllRoles } from '@/lib/store/slices/rolesSlice';
import { useAppDispatch } from '@/lib/store/store';

export const RoleInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().optional(),
  superiorTitle: z.string().optional(),
  subordinatesTitles: z.array(z.string()).optional(),
});

export type RoleInput = z.infer<typeof RoleInputSchema>;

type RoleProps = {
  subordinatesTitles?: string[];
  superiorTitle?: string;
};

export default function RoleForm({
  subordinatesTitles,
  superiorTitle,
}: RoleProps): JSX.Element {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<RoleInput>({
    resolver: zodResolver(RoleInputSchema),
  });
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);

  const formSubmit = (): void => {
    const data = getValues();
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
        <button
          type="button" // Change button type to button
          className="btn glow-on-hover mr-1"
          onClick={(e) => {
            e.preventDefault();
            formSubmit();
          }}
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

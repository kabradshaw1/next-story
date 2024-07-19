'use client';
import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/main/forms/FormInput/InputField';
import { addRole, removeAllRoles } from '@/lib/store/slices/rolesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';

const baseRoleInputSchema = z.object({
  // I've opted to use roleTitle here to avoid confusion with the title of the organization
  roleTitle: z.string().min(1, 'Title is required'),
  text: z.string().optional(),
  superiorTitle: z.string().optional(),
});

export type RoleInput = z.infer<typeof baseRoleInputSchema>;

type RoleFormProps = {
  superiorTitle?: string;
};

export default function RoleForm({
  superiorTitle,
}: RoleFormProps): JSX.Element {
  const { roles } = useAppSelector((state) => state.roles);
  const existingTitles = roles.map((role) => role.roleTitle);

  const RoleInputSchema = baseRoleInputSchema.refine(
    (data) => !existingTitles.includes(data.roleTitle),
    {
      message: 'Title must be unique',
      path: ['title'],
    }
  );

  const {
    register,
    getValues,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<RoleInput>({
    resolver: zodResolver(RoleInputSchema),
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (superiorTitle !== undefined) {
      setValue('superiorTitle', superiorTitle);
    }
  }, [superiorTitle, setValue]);

  const formSubmit = (): void => {
    const data = getValues();
    const role = { ...data };
    try {
      dispatch(addRole(role));
      reset();
      setMessage('Role added successfully');
    } catch (error) {
      setMessage('Error adding role');
    }
  };

  const clearState = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setMessage('Roles Cleared and Not Submitted');
    dispatch(removeAllRoles());
    reset(); // Reset the form values
  };

  return (
    <div className="w-full max-w-lg">
      <div className="card">
        <InputField<RoleInput>
          id="superiorTitle"
          label="Superior Role (Click To Select)"
          placeholder="Click A Superior"
          trigger={trigger}
          error={errors.superiorTitle?.message}
          register={register}
          readOnly={true}
        />
        <InputField<RoleInput>
          id="roleTitle"
          label="Role"
          placeholder="Role title"
          trigger={trigger}
          error={errors.roleTitle?.message}
          register={register}
        />
        <InputField<RoleInput>
          id="text"
          label="Role Description"
          placeholder="Role description"
          trigger={trigger}
          error={errors.text?.message}
          register={register}
        />
        <button
          type="button"
          className="btn glow-on-hover mr-1"
          onClick={(e) => {
            e.preventDefault();
            formSubmit();
          }}
          disabled={!isValid}
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

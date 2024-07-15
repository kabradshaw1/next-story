import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  type UseFormRegister,
  type FieldErrors,
  type UseFormTrigger,
  type UseFormSetValue,
} from 'react-hook-form';
import { type ZodType } from 'zod';

type CommonFormProps<T extends FieldValues> = {
  validationSchema: ZodType<T>;
  onSubmit: SubmitHandler<T>;
  initialFiles?: File[];
  children: (props: {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    trigger: UseFormTrigger<T>;
    setValue: UseFormSetValue<T>;
  }) => React.ReactNode;
};

export default function CommonForm<T extends FieldValues>({
  validationSchema,
  onSubmit,
  children,
}: CommonFormProps<T>): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<T>({
    resolver: zodResolver(validationSchema),
  });

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    setLoading(true);
    setMessage(null);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <form
        noValidate
        className="card"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {children({ register, trigger, setValue, errors })}
        <button type="submit" className="btn glow-on-hover" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message !== null && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}

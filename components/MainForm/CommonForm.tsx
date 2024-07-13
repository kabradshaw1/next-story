import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  type UseFormRegister,
  type FieldErrors,
} from 'react-hook-form';
import { type ZodType } from 'zod';

import FileUploader from '@/components/main/forms/FileUploader/FileUploader';

type CommonFormProps<T extends FieldValues> = {
  validationSchema: ZodType<T>;
  onSubmit: SubmitHandler<T>;
  initialFiles?: File[];
  children: (props: {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
  }) => React.ReactNode;
};

export default function CommonForm<T extends FieldValues>({
  validationSchema,
  onSubmit,
  initialFiles = [],
  children,
}: CommonFormProps<T>): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>(initialFiles);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
        {children({ register, errors })}
        <FileUploader
          files={files}
          setFiles={setFiles}
          setValue={setValue}
          error={errors.files?.message as string | undefined}
        />
        <button type="submit" className="btn glow-on-hover" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message !== null && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}

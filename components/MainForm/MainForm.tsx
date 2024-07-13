import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z, type ZodType } from 'zod';

import FileUploader from '@/components/main/forms/FileUploader/FileUploader';
import InputField from '@/components/main/forms/FormInput/InputField';

type CommonFormProps<T> = {
  validationSchema: ZodType<T>;
  onSubmit: SubmitHandler<T>;
  initialFiles?: File[];
  initialRoles?: number[];
  children: React.ReactNode;
};

export default function CommonForm<T>({
  validationSchema,
  onSubmit,
  initialFiles = [],
  initialRoles = [],
  children,
}: CommonFormProps<T>): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [selectedRoles, setSelectedRoles] = useState<number[]>(initialRoles);

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
      setMessage('Success!');
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
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(handleFormSubmit)();
        }}
      >
        {children}
        <FileUploader
          files={files}
          setFiles={setFiles}
          setValue={setValue}
          error={errors.files?.message}
        />
        <button type="submit" className="btn glow-on-hover" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}

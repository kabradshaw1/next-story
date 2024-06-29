'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';

import Roles from './Roles';

export default function CharacterForm(): JSX.Element {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const validationSchema = z.object({
    title: z.string().min(1, 'Name is required'),
    text: z.string().min(1, 'Description is required'),
    files: z.array(z.instanceof(File)).optional(),
    roles: z.array(z.number()).optional(),
  });

  type CharacterProps = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CharacterProps>({
    resolver: zodResolver(validationSchema),
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFiles =
      event.target.files !== null ? Array.from(event.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setValue('files', [...files, ...selectedFiles]);
  };

  const handleRemoveFile = (fileToRemove: File): void => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    setValue('files', updatedFiles);
  };

  const formSubmit: SubmitHandler<CharacterProps> = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    data.files?.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('roles', JSON.stringify(selectedRoles));

    setLoading(true);

    try {
      const response = await fetch('/api/characters', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Character created successfully');
        router.push('/characters');
      } else {
        setMessage('Failed to create character');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-lg">
        <form
          noValidate
          className="card"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(formSubmit)();
          }}
        >
          <div className="mb-4">
            <label htmlFor="title" className="label">
              Name
            </label>
            <input
              type="text"
              id="title"
              placeholder="Name"
              className="input bg-gray-700"
              {...register('title')}
            />
            <p className="error-message">{errors.title?.message}</p>
            <label htmlFor="text" className="label mt-1">
              Back Ground
            </label>
            <input
              type="text"
              id="text"
              placeholder="Description"
              className="input bg-gray-700"
              {...register('text')}
            />
            <p className="error-message">{errors.text?.message}</p>
            <label htmlFor="files" className="label mt-1">
              Images
            </label>
            <input
              type="file"
              id="files"
              className="input bg-gray-700"
              multiple
              onChange={handleFileChange}
            />
            <p className="error-message">{errors.files?.message}</p>
            {files.length > 0 && (
              <ul className="mt-2">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="text-red-500 ml-2"
                      onClick={() => {
                        handleRemoveFile(file);
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <label htmlFor="roles" className="label mt-4">
              Roles
            </label>
            <Roles
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
            />
          </div>

          <button
            type="submit"
            className="btn glow-on-hover"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Character'}
          </button>
          {message !== null && <p className="mt-2 text-center">{message}</p>}
        </form>
      </div>
      <div className="w-full max-w-xs mt-4">
        <div className="card">
          <Logo />
        </div>
      </div>
    </>
  );
}

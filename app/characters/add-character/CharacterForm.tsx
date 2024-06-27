'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';

export default function CharacterForm(): JSX.Element {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validationSchema = z.object({
    title: z.string().min(1, 'Name is required'),
    text: z.string().min(1, 'Description is required'),
  });

  type CharacterProps = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CharacterProps>({
    resolver: zodResolver(validationSchema),
  });

  const formSubmit: SubmitHandler<CharacterProps> = async (data) => {
    // Handle form submission, including the image file
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    // formData.append('file', data.file);

    setLoading(true);

    try {
      // Replace with your API call logic
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

            <label htmlFor="file" className="label mt-1">
              Image
            </label>
            <input
              type="file"
              id="file"
              className="input bg-gray-700"
              {...register('file')}
            />
            <p className="error-message">{errors.file?.message}</p>
          </div>

          <button
            type="submit"
            className="btn glow-on-hover"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Character'}
          </button>
          {message && <p className="mt-2 text-center">{message}</p>}
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

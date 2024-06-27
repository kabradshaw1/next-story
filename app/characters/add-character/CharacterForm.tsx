'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';
import { useRolesQuery } from '@/generated/graphql';

export default function CharacterForm(): JSX.Element {
  const { loading: roleLoading, error, data } = useRolesQuery();

  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validationSchema = z.object({
    title: z.string().min(1, 'Name is required'),
    text: z.string().min(1, 'Description is required'),
    files: z.string().url('This image is not a valid format'),
  });

  return (
    <>
      <div className="w-full max-w-lg">
        <Logo />
      </div>
    </>
  );
}

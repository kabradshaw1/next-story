'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';
import { axiosAuthInstance } from '@/lib/axios';
import { setAuth } from '@/lib/store/slices/authSlice';
import { useAppDispatch } from '@/lib/store/store';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('This email is not a valid format'),
    password: z
      .string()
      .min(6, 'This password is too short')
      .max(50, 'This password is too long'),
  });

  type LoginProps = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginProps>({
    resolver: zodResolver(validationSchema),
  });

  const formSubmit: SubmitHandler<LoginProps> = async (data) => {
    setLoading(true);
    try {
      setMessage('Logging in...');
      const response = await axiosAuthInstance.post('/login', data);
      if (response.status === 200) {
        dispatch(setAuth({ token: response.data.token }));
        router.push('/');
      } else {
        setMessage('Failed to login');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      setMessage('Failed to login');
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
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register('email')}
              className={`input ${errors.email !== null ? 'border-red-600' : 'border-gray-700'} bg-gray-700`}
              onBlur={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                trigger('email');
              }}
            />
            <p className="error-message">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register('password')}
              className={`input ${errors.password !== null ? 'border-red-600' : 'border-gray-700'} bg-gray-700`}
              onBlur={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                trigger('password');
              }}
            />
            <p className="error-message">{errors.password?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn" disabled={loading}>
              Submit Form
            </button>
            <p className="text-sm text-custom-blue">{message}</p>
          </div>
        </form>
      </div>
      <div className="w-full max-w-xs">
        <div className="card">
          <Logo />
        </div>
      </div>
    </>
  );
}

'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';
import { useAppDispatch } from '@/lib/store';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
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
  const formSubmit: SubmitHandler<LoginProps> = (data) => {};
  return (
    <>
      <div className="w-full max-w-lg">
        <form
          noValidate
          className="card"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formSubmit);
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
            <button type="submit" className="btn">
              Submit Form
            </button>
            <p className="text-sm text-custom-blue">place holder message</p>
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

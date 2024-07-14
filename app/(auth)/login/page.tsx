'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';
import InputField from '@/components/main/forms/FormInput/InputField';
import CommonForm from '@/components/MainForm/CommonForm';
import { axiosAuthInstance } from '@/lib/axios';
import { setAuth } from '@/lib/store/slices/authSlice';
import { useAppDispatch } from '@/lib/store/store';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const response = await axiosAuthInstance.post('/login', data);
    if (response.status === 200) {
      dispatch(setAuth({ token: response.data.token }));
      router.push('/');
    }
  };

  return (
    <>
      <CommonForm<LoginProps>
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ register, errors, trigger }) => (
          <div className="mb-4">
            <InputField<LoginProps>
              id="email"
              label="Email"
              placeholder="Enter email"
              error={errors.email?.message}
              register={register}
              trigger={trigger}
            />
            <InputField<LoginProps>
              id="password"
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
              register={register}
              trigger={trigger}
            />
          </div>
        )}
      </CommonForm>
      <div className="w-full max-w-xs">
        <div className="card">
          <Logo />
        </div>
      </div>
    </>
  );
}

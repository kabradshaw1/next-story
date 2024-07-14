'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/Logo/Logo';
import InputField from '@/components/main/forms/FormInput/InputField';
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
    setMessage('Waiting...');
    try {
      setMessage('Logging in...');
      const response = await axiosAuthInstance.post('/login', data);
      if (response.status === 200) {
        dispatch(setAuth({ token: response.data.token }));
        router.push('/');
      } else {
        setMessage('Failed to login');
      }
    } catch (e) {
      console.error(e);
      if (e.response?.status === 401) {
        setMessage('Invalid username or password');
      } else {
        setMessage('Internal server error');
      }
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

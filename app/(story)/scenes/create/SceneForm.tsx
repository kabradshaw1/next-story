'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import CommonForm from '@/components/CommonForm/CommonForm';
import FileUploader from '@/components/main/forms/FileUploader/FileUploader';
import InputField from '@/components/main/forms/FormInput/InputField';
import { useCreateSceneMutation } from '@/generated/graphql';
import { addScene } from '@/lib/store/slices/sceneSlice';

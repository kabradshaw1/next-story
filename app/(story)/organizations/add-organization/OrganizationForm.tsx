import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { useCreateOrganizationMutation } from '@/generated/graphql';

type RoleInput = {
  title: string;
  text?: string;
  superiorTitle?: string;
  subordinatesTitles?: string[];
};
export default function OrganizationFOrm(): JSX.Element {
  const [createOrganization, { error }] = useCreateOrganizationMutation();

  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedConflicts, setSelectedConflicts] = useState<number[]>([]);
  const [selectedHeadquarters, setSelectedHeadquarters] = useState<number>();

  const validationSchema = z.object({
    title: z.string().min(1, 'Name is required'),
    text: z.string().min(1, 'Description is required'),
    files: z.array(z.instanceof(File)).optional(),
    roles: z.array(z.number()).optional(),
    locations: z.array(z.number()).optional(),
    conflicts: z.array(z.number()).optional(),
    headquarters: z.number().optional(),
  });

  return <></>;
}

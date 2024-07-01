import type { Dispatch, SetStateAction } from 'react';

import { useForOrganizationFormQuery } from '@/generated/graphql';

type Props = {
  selectedConflicts: number[];
  setSelectedConflicts: Dispatch<SetStateAction<number[]>>;
  selectedLocations: number[];
};

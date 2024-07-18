import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateOrganizationMutation } from '@/generated/graphql';

type OrgState = {
  organization: CreateOrganizationMutation['createOrganization'] | null;
  images: string[];
};

const initialState: OrgState = {
  organization: null,
  images: [],
};

const orgSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    addOrg(
      state: OrgState,
      action: PayloadAction<{
        organization: CreateOrganizationMutation['createOrganization'];
        images: string[];
      }>
    ) {
      state.organization = action.payload.organization;
      state.images = action.payload.images;
    },
    removeOrg(state: OrgState) {
      state.organization = null;
      state.images = [];
    },
  },
});

export const { addOrg, removeOrg } = orgSlice.actions;
export default orgSlice;

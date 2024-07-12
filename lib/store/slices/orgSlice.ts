import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateOrganizationMutation } from '@/generated/graphql';

type RoleState = {
  organization: CreateOrganizationMutation['createOrganization'] | null;
  images: string[];
};

const initialState: RoleState = {
  organization: null,
  images: [],
};

const orgSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    addOrg(
      state: RoleState,
      action: PayloadAction<{
        organization: CreateOrganizationMutation['createOrganization'];
        images: string[];
      }>
    ) {
      state.organization = action.payload.organization;
      state.images = action.payload.images;
    },
    removeOrg(state: RoleState) {
      state.organization = null;
      state.images = [];
    },
  },
});

export const { addOrg, removeOrg } = orgSlice.actions;
export default orgSlice;

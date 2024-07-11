import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateOrganizationMutation } from '@/generated/graphql';

type OrganizationWithoutUploadURLs = Omit<
  CreateOrganizationMutation['createOrganization'],
  'uploadURLs'
>;

type RoleState = {
  organization: OrganizationWithoutUploadURLs | null;
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
        organization: OrganizationWithoutUploadURLs;
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

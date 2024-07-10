import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateOrganizationMutation } from '@/generated/graphql';

type OrganizationWithoutUploadURLs = Omit<
  CreateOrganizationMutation['createOrganization'],
  'uploadURLs'
>;

type RoleState = {
  organization: OrganizationWithoutUploadURLs | null;
};

const initialState: RoleState = {
  organization: null,
};

const orgSlice = createSlice({
  name: 'organzations',
  initialState,
  reducers: {
    addOrg(
      state: RoleState,
      action: PayloadAction<OrganizationWithoutUploadURLs>
    ) {
      state.organization = action.payload;
    },
    removeOrg(state: RoleState) {
      state.organization = null;
    },
  },
});

export const { addOrg, removeOrg } = orgSlice.actions;
export default orgSlice;

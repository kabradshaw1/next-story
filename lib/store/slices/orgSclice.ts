import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Organization } from '@/generated/graphql';

type RoleState = {
  organization: Organization | null;
};

const initialState: RoleState = {
  organization: null,
};

const orgSlice = createSlice({
  name: 'organzations',
  initialState,
  reducers: {
    addOrg(state: RoleState, action: PayloadAction<Organization>) {
      state.organization = action.payload;
    },
    removeOrg(state: RoleState) {
      state.organization = null;
    },
  },
});

export const { addOrg, removeOrg } = orgSlice.actions;
export default orgSlice;

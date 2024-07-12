import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RoleInput } from '@/app/(story)/organizations/create/RoleForm';

export type RolesState = {
  roles: RoleInput[];
};

const initialState: RolesState = {
  roles: [],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole(state: RolesState, action: PayloadAction<RoleInput>) {
      state.roles.push(action.payload);
    },
    removeRole(state: RolesState, action: PayloadAction<string>) {
      state.roles = state.roles.filter(
        (role) => role.roleTitle !== action.payload
      );
    },
    removeAllRoles(state: RolesState) {
      state.roles = [];
    },
  },
});

export const { addRole, removeRole, removeAllRoles } = rolesSlice.actions;
export default rolesSlice;

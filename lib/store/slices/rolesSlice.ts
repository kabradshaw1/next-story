import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type RolesState = {
  roles: Array<{
    title: string;
    text?: string;
    superiorTitle?: string;
    subordinatesTitles?: string[];
  }>;
};

const initialState: RolesState = { roles: [] };

const rolesSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addRole(state: RolesState, action: PayloadAction<RolesState>) {
      state.roles.push(action.payload.roles[0]);
    },
    removeRole(state: RolesState, action: PayloadAction<string>) {
      state.roles = state.roles.filter((role) => role.title !== action.payload);
    },
    removeAllRoles(state: RolesState) {
      state.roles = [];
    },
  },
});

export const { addRole, removeRole, removeAllRoles } = rolesSlice.actions;
export default rolesSlice;

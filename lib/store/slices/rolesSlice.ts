import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type RoleState = {
  roles: Array<{
    title: string;
    text: string;
    superiorTitle: string;
    subordinatesTitles: string[];
  }>;
};

const initialState: RoleState = { roles: [] };

const rolesSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addRole(state: RoleState, action: PayloadAction<RoleState>) {
      state.roles.push(action.payload.roles[0]);
    },
    removeRole(state: RoleState, action: PayloadAction<string>) {
      state.roles = state.roles.filter((role) => role.title !== action.payload);
    },
    removeAllRoles(state: RoleState) {
      state.roles = [];
    },
  },
});

export const { addRole, removeRole, removeAllRoles } = rolesSlice.actions;
export default rolesSlice;

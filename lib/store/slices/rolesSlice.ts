import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Role = {
  title: string;
  text?: string;
  superiorTitle?: string;
  subordinatesTitles?: string[];
};

export type RolesState = {
  roles: Role[];
};

const initialState: RolesState = {
  roles: [{ title: 'Create A Role' }],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole(state: RolesState, action: PayloadAction<Role>) {
      state.roles.push(action.payload);
    },
    removeRole(state: RolesState, action: PayloadAction<string>) {
      state.roles = state.roles.filter((role) => role.title !== action.payload);
    },
    removeAllRoles(state: RolesState) {
      state.roles = [{ title: 'Create A Role' }];
    },
  },
});

export const { addRole, removeRole, removeAllRoles } = rolesSlice.actions;
export default rolesSlice;

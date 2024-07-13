import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateCharacterMutation } from '@/generated/graphql';

type CharacterState = {
  character: CreateCharacterMutation['createCharacter'] | null;
  images: string[];
};

const initialState: CharacterState = {
  character: null,
  images: [],
};

const charSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addChar(
      state: CharacterState,
      action: PayloadAction<{
        character: CreateCharacterMutation['createCharacter'];
        images: string[];
      }>
    ) {
      state.character = action.payload.character;
      state.images = action.payload.images;
    },
    removeChar(state: CharacterState) {
      state.character = null;
      state.images = [];
    },
  },
});

export const { addChar, removeChar } = charSlice.actions;
export default charSlice;

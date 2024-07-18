import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateSceneMutation } from '@/generated/graphql';

type SceneState = {
  scene: CreateSceneMutation['createScene'] | null;
  images: string[];
};

const initialState: SceneState = {
  scene: null,
  images: [],
};

const sceneSlice = createSlice({
  name: 'scenes',
  initialState,
  reducers: {
    addScene(
      state: SceneState,
      action: PayloadAction<{
        scene: CreateSceneMutation['createScene'];
        images: string[];
      }>
    ) {
      state.scene = action.payload.scene;
      state.images = action.payload.images;
    },
    removeScene(state: SceneState) {
      state.scene = null;
      state.images = [];
    },
  },
});

export const { addScene, removeScene } = sceneSlice.actions;
export default sceneSlice;

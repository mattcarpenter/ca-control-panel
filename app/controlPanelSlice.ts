import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';

const initialState = {
  mediaSelection: {
    albumArtImages: [],
    selectedAlbumArtImage: null,
    artist: null,
    title: null,
  },
};

const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState: initialState,
  reducers: {
    setAlbumArtImages: (state, action: PayloadAction<string[]>) => {
      state.mediaSelection.albumArtImages = action.payload;
    },
    setSelectedAlbumArtImage: (state, action: PayloadAction<string | null>) => {
      state.mediaSelection.selectedAlbumArtImage = action.payload;
    },
    setMediaSelectionArtist: (state, action: PayloadAction<string | null>) => {
      state.mediaSelection.artist = action.payload;
    },
    setMediaSelectionTitle: (state, action: PayloadAction<string | null>) => {
      state.mediaSelection.title = action.payload;
    }
  },
});

export const {
  setAlbumArtImages,
  setSelectedAlbumArtImage,
  setMediaSelectionArtist,
  setMediaSelectionTitle,
} = controlPanelSlice.actions;

export default controlPanelSlice.reducer;

export const selectAlbumArtImages = (state: RootState) => state.controlPanel.mediaSelection.albumArtImages;
export const selectMediaSelectionSelectedAlbumArtImage = (state: RootState) => state.controlPanel.mediaSelection.selectedAlbumArtImage;
export const selectMediaSelectionArtist = (state: RootState) => state.controlPanel.mediaSelection.artist;
export const selectMediaSelectionTitle = (state: RootState) => state.controlPanel.mediaSelection.title;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';

const initialState = {
  mediaSelection: {
    albumArtImages: [],
    selectedAlbumArtImage: null,
    selectedMediaTypeImage: null,
    artist: '',
    title: '',
  },
  cued: {
    selectedAlbumArtImage: null,
    selectedMediaTypeImage: null,
    artist: null,
    title: null,
  },
  onAir: {
    selectedAlbumArtImage: null,
    selectedMediaTypeImage: null,
    artist: null,
    title: null,
  },
  liveText: '',
};

const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState,
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
    },
    setMediaSelectionMediaTypeImage: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.mediaSelection.selectedMediaTypeImage = action.payload;
    },
    cue: (state) => {
      state.cued.artist = state.mediaSelection.artist;
      state.cued.title = state.mediaSelection.title;
      state.cued.selectedMediaTypeImage =
        state.mediaSelection.selectedMediaTypeImage;
      state.cued.selectedAlbumArtImage =
        state.mediaSelection.selectedAlbumArtImage;
      state.mediaSelection = { ...initialState.mediaSelection };
    },
    take: (state) => {
      // todo: push to web server and media encoder
      state.onAir = { ...state.cued };
      state.cued = { ...initialState.cued };
    },
    reset: (state) => {
      state.onAir = { ...initialState.onAir };
      state.cued = { ...initialState.cued };
      state.mediaSelection = { ...initialState.mediaSelection };
      state.liveText = '';
    },
    setLiveText: (state, action: PayloadAction<string>) => {
      state.liveText = action.payload;
    },
  },
});

export const {
  setAlbumArtImages,
  setSelectedAlbumArtImage,
  setMediaSelectionArtist,
  setMediaSelectionTitle,
  setMediaSelectionMediaTypeImage,
  cue,
  take,
  reset,
  setLiveText,
} = controlPanelSlice.actions;

export default controlPanelSlice.reducer;

export const selectAlbumArtImages = (state: RootState) =>
  state.controlPanel.mediaSelection.albumArtImages;
export const selectMediaSelectionSelectedAlbumArtImage = (state: RootState) =>
  state.controlPanel.mediaSelection.selectedAlbumArtImage;
export const selectMediaSelectionArtist = (state: RootState) =>
  state.controlPanel.mediaSelection.artist;
export const selectMediaSelectionTitle = (state: RootState) =>
  state.controlPanel.mediaSelection.title;
export const selectMediaSelectionSelectedMediaTypeImage = (state: RootState) =>
  state.controlPanel.mediaSelection.selectedMediaTypeImage;

export const selectCuedMetadata = (state: RootState) => state.controlPanel.cued;
export const selectOnAirMetadata = (state: RootState) =>
  state.controlPanel.onAir;

export const selectLiveText = (state: RootState) => state.controlPanel.liveText;

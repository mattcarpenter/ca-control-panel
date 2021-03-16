import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';
import RendererProcessBridge from './lib/rendererProcessBridge';

const rendererProcessBridge = RendererProcessBridge.getInstance();

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
  settings: {
    apiBasePath: '',
    streamingEncoderIp: '',
    streamingEncoderPort: '',
    albumArtDirectory: '',
    pickedAlbumArtDirectory: '',
    albumCSVFile: '',
    apiUsername: '',
    apiPassword: '',
  },
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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (areEqualShallow(state.cued, initialState.cued)) {
        console.warn('[controlPanelSlice#take] take called but cued is empty');
        return;
      }

      state.onAir = { ...state.cued };
      state.cued = { ...initialState.cued };

      rendererProcessBridge.sendMetadata(
        state.onAir.artist || '',
        state.onAir.title || '',
        state.onAir.selectedAlbumArtImage || '',
        state.onAir.selectedMediaTypeImage || ''
      );
    },
    reset: (state) => {
      state.onAir = { ...initialState.onAir };
      state.cued = { ...initialState.cued };
      state.mediaSelection = { ...initialState.mediaSelection };
      state.liveText = '';
      rendererProcessBridge.goOffAir();
      rendererProcessBridge.sendLiveText('');
    },
    setLiveText: (state, action: PayloadAction<string>) => {
      state.liveText = action.payload;
    },
    sendLiveText: (state) => {
      rendererProcessBridge.sendLiveText(state.liveText);
      state.liveText = '';
    },
    clearLiveText: (state) => {
      state.liveText = '';
      if (state.onAir.artist && state.onAir.title) {
        rendererProcessBridge.sendLiveText(
          `${state.onAir.artist} - ${state.onAir.title}`, { streamingEncoderOnly: true }
        );
      } else {
        rendererProcessBridge.sendLiveText('');
      }
    },
    setPickedAlbumArtDirectory: (state, action: PayloadAction<string>) => {
      state.settings.pickedAlbumArtDirectory = action.payload;
    },
    setReduxApiBasePath: (state, action: PayloadAction<string>) => {
      state.settings.apiBasePath = action.payload;
    },
    setReduxStreamingEncoderIp: (state, action: PayloadAction<string>) => {
      state.settings.streamingEncoderIp = action.payload;
    },
    setReduxStreamingEncoderPort: (state, action: PayloadAction<string>) => {
      state.settings.streamingEncoderPort = action.payload;
    },
    setReduxAlbumArtDirectory: (state, action: PayloadAction<string>) => {
      state.settings.albumArtDirectory = action.payload;
    },
    setAlbumCSVFile: (state, action: PayloadAction<string>) => {
      state.settings.albumCSVFile = action.payload;
    },
    setReduxApiUsername: (state, action: PayloadAction<string>) => {
      state.settings.apiUsername = action.payload;
    },
    setReduxApiPassword: (state, action: PayloadAction<string>) => {
      state.settings.apiPassword = action.payload;
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
  sendLiveText,
  clearLiveText,
  setPickedAlbumArtDirectory,
  setAlbumCSVFile,
  setReduxAlbumArtDirectory,
  setReduxApiBasePath,
  setReduxStreamingEncoderIp,
  setReduxStreamingEncoderPort,
  setReduxApiUsername,
  setReduxApiPassword,
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
export const selectPickedAlbumArtDirectory = (state: RootState) => state.controlPanel.settings.pickedAlbumArtDirectory;
export const selectAlbumArtDirectory = (state: RootState) => state.controlPanel.settings.albumArtDirectory;
export const selectAlbumCSVFile = (state: RootState) => state.controlPanel.settings.albumCSVFile;
export const selectApiBasePath = (state: RootState) => state.controlPanel.settings.apiBasePath;
export const selectStreamingEncoderIp = (state: RootState) => state.controlPanel.settings.streamingEncoderIp;
export const selectStreamingEncoderPort = (state: RootState) => state.controlPanel.settings.streamingEncoderPort;
export const selectApiUsername = (state: RootState) => state.controlPanel.settings.apiUsername;
export const selectApiPassword = (state: RootState) => state.controlPanel.settings.apiPassword;

function areEqualShallow(a, b) {
  for (let key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (let key in b) {
    if (!(key in a)) {
      return false;
    }
  }
  return true;
}

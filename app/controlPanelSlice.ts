import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from './store';

const initialState = {
  albumArtImages: [],
};

const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setAlbumArtImages: (state, action: PayloadAction<string[]>) => {
      state.albumArtImages = action.payload;
    },
  },
});

export const { increment, decrement, setAlbumArtImages } = controlPanelSlice.actions;

export const incrementIfOdd = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.counter.value % 2 === 0) {
      return;
    }
    dispatch(increment());
  };
};

export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export default controlPanelSlice.reducer;

export const selectCount = (state: RootState) => state.counter.value;

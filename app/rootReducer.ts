import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-cycle
import counterReducer from './controlPanelSlice';

export default function createRootReducer() {
  return combineReducers({
    controlPanel: counterReducer,
  });
}

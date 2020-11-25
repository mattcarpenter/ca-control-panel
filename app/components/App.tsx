import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Store } from '../store';
import ControlPanel from './pages/ControlPanel';
//import styles from './Home.css'; usage: styles.container

interface Props {
  store: Store;
}

const App = ({ store }: Props) => (
  <Provider store={store}>
    <ControlPanel />
  </Provider>
);

export default hot(App);

import React, { Fragment } from 'react';
import { ipcRenderer } from 'electron';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { configuredStore } from './store';
import RendererProcessBridge from './lib/rendererProcessBridge';
import * as Sentry from "@sentry/electron";
Sentry.init({ dsn: "https://d8ee062fad5c494a931fb12caac92e5e@o560549.ingest.sentry.io/5696412" });

import './app.global.css';

const store = configuredStore();

// initialize the cross process communication bridge and begin loading album art data
const bridge = RendererProcessBridge.getInstance();
bridge.initialize(ipcRenderer, store);
bridge.loadSettings();
bridge.loadAlbumArtFromDisk();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./components/App.tsx').default;
  render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
});

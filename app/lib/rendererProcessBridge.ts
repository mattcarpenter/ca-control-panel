import { IpcRenderer } from 'electron';
import {
  setAlbumArtImages,
  setPickedAlbumArtDirectory,
  setReduxApiBasePath,
  setReduxAlbumArtDirectory,
  setReduxStreamingEncoderIp,
  setReduxStreamingEncoderPort,
} from '../controlPanelSlice';

export default class RendererProcessBridge {
  private static instance: RendererProcessBridge;
  private ipcRenderer: IpcRenderer;
  private store: any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): RendererProcessBridge {
    if (!RendererProcessBridge.instance) {
      RendererProcessBridge.instance = new RendererProcessBridge();
    }

    return RendererProcessBridge.instance;
  }

  initialize(ipcRenderer: IpcRenderer, store: any) {
    this.ipcRenderer = ipcRenderer;
    this.store = store;

    this.ipcRenderer.on('album-art-data', (_event, images) => {
      this.store.dispatch(setAlbumArtImages(images));
    });

    this.ipcRenderer.on('directory-picked', (_event, directory) => {
      this.store.dispatch(setPickedAlbumArtDirectory(directory));
    });

    this.ipcRenderer.on('settings', (_event, settings) => {
      this.store.dispatch(setReduxApiBasePath(settings.apiBasePath));
      this.store.dispatch(setReduxStreamingEncoderIp(settings.streamingEncoderIp));
      this.store.dispatch(setReduxStreamingEncoderPort(settings.streamingEncoderPort));
      this.store.dispatch(setReduxAlbumArtDirectory(settings.albumArtDirectory));
    });
  }

  loadSettings() {
    this.ipcRenderer.send('load-settings');
  }

  searchAlbumArt() {
    const query = this.store.getState().controlPanel.mediaSelection.artist;
    this.ipcRenderer.send('search-album-art', query);
  }

  loadAlbumArtFromDisk() {
    this.ipcRenderer.send('load-album-art');
  }

  launchDirectoryPicker() {
    this.ipcRenderer.send('launch-directory-picker');
  }

  storeSettings() {
    this.ipcRenderer.send('store-settings', this.store.getState().controlPanel.settings);
  }

  sendMetadata(artist: string, title: string, selectedAlbumArtImage: string, selectedMediaTypeImage: string) {
    console.log('client side: bout to send-metadata')
    this.ipcRenderer.send('send-metadata', {
      artist,
      title,
      selectedAlbumArtImage,
      selectedMediaTypeImage,
    });
  }
}

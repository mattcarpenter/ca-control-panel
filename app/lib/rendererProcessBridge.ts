import { IpcRenderer } from 'electron';
import {
  setAlbumArtImages,
  setPickedAlbumArtDirectory,
  setReduxApiBasePath,
  setReduxAlbumArtDirectory,
  setAlbumCSVFile,
  setReduxStreamingEncoderIp,
  setReduxStreamingEncoderPort,
  setReduxApiUsername,
  setReduxApiPassword,
} from '../controlPanelSlice';
import {ToastsStore} from 'react-toasts';

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
      console.log('directory picked', directory);
      this.store.dispatch(setReduxAlbumArtDirectory(directory));
    });

    this.ipcRenderer.on('file-picked', (_event, file) => {
      console.log('file picked', file);
      this.store.dispatch(setAlbumCSVFile(file));
    });

    /*this.ipcRenderer.on('settings', (_event, settings) => {
      this.store.dispatch(setReduxApiBasePath(settings.apiBasePath));
      this.store.dispatch(setReduxStreamingEncoderIp(settings.streamingEncoderIp));
      this.store.dispatch(setReduxStreamingEncoderPort(settings.streamingEncoderPort));
      this.store.dispatch(setReduxAlbumArtDirectory(settings.albumArtDirectory));
      this.store.dispatch(setAlbumCSVFile(settings.albumCSVFile));
      this.store.dispatch(setReduxApiUsername(settings.apiUsername));
      this.store.dispatch(setReduxApiPassword(settings.apiPassword));
    });*/

    ipcRenderer.on('toast', (_event, message) => {
      ToastsStore.error(message, 3000, 'toast-override');
    });
  }

  loadSettings() {
    this.ipcRenderer.send('load-settings');
  }

  getSettings() {
    return new Promise(resolve => {
      this.ipcRenderer.once('settings', (_event, settings) => {
        resolve(settings);
      });
      this.ipcRenderer.send('load-settings');
    });
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

  launchFilePicker() {
    this.ipcRenderer.send('launch-file-picker');
  }

  storeSettings(settings) {
    this.ipcRenderer.send('store-settings', settings);
  }

  sendMetadata(artist: string, title: string, selectedAlbumArtImage: string, selectedMediaTypeImage: string) {
    this.ipcRenderer.send('send-metadata', {
      artist,
      title,
      selectedAlbumArtImage,
      selectedMediaTypeImage,
    });
  }

  goOffAir() {
    this.ipcRenderer.send('off-air');
  }

  sendLiveText(text: string) {
    this.ipcRenderer.send('livetext', text);
  }
}

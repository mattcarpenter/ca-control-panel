import { IpcMain, dialog, BrowserWindow } from 'electron';
import { glob } from 'glob';
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';
import elasticlunr from 'elasticlunr';
import settings from 'electron-settings';
import {
  updateMetadata as updateStreamingEncoderMetadata,
  updateLiveText as updateStreamingEncoderLiveText,
} from './service/streamingEncoder';
import {
  goOffAir,
  updateMetdata as updateWebMetadata,
  updateLiveText as updateWebLiveText,
} from './service/web';

const DEFAULT_STREAMING_ENCODER_IP = '192.168.1.200';
const DEFAULT_STREAMING_ENCODER_PORT = 9000;

elasticlunr.clearStopWords();
elasticlunr.addStopWords(['a', 'and', 'the']);

let index;
let mapping;
let albumNames = {};

export default function initialize(ipcMain: IpcMain, mainWindow: BrowserWindow) {
  initializeSearchIndex();
  loadAlbumDictionary();

  /**
   * Loads album art images from disk and builds the search index. Invoked on application initialization
   */
  ipcMain.on('load-album-art', loadAlbumArt);

  /**
   * Loads album name dictionary
   */

  /**
   * Searches the search index for the given query (album name)
   */
  ipcMain.on('search-album-art', (event, query) => {
    if (query === null || query === '') {
      event.reply('album-art-data', []);
    } else {
      event.reply('album-art-data', index.search(query, { expand: true }).map(d => mapping[d.ref]));
    }
  });

  /**
   * Launches the system directory picker modal
   */
  ipcMain.on('launch-directory-picker', async (event) => {
    const files = dialog.showOpenDialogSync(mainWindow, {
      properties: ['openDirectory'], //openFile too?
    });

    if (Array.isArray(files) && files.length > 0) {
      event.reply('directory-picked', files[0]);
    }
  });

  /**
   * Launches the system file picker modal
   */
  ipcMain.on('launch-file-picker', async (event) => {
    const paths = dialog.showOpenDialogSync(mainWindow, {
      properties: ['openFile'],
    });

    if (Array.isArray(paths) && paths.length > 0) {
      event.reply('file-picked', paths[0]);
    }
  });

  ipcMain.on('load-settings', async (event) => {
    const s = await getSettings();
    console.log('main process getSettings: ', s);
    event.reply('settings', s);
  });

  ipcMain.on('store-settings', async (_event, s) => {
    const obj = {
      apiBasePath: s.apiBasePath,
      streamingEncoderIp: s.streamingEncoderIp,
      streamingEncoderPort: s.streamingEncoderPort,
      albumArtDirectory: s.albumArtDirectory,
      albumCSVFile: s.albumCSVFile,
      apiUsername: s.apiUsername,
      apiPassword: s.apiPassword,
    };

    await settings.set('settings', obj);
    console.log('main process store settings: ', obj);
    loadAlbumArt();
    loadAlbumDictionary();
  });

  ipcMain.on('send-metadata', async (_event, metadata) => {
    console.log('[mainProcessBridge] send-metadata');
    const s = await getSettings();
    updateStreamingEncoderMetadata(
      s.streamingEncoderIp,
      s.streamingEncoderPort,
      metadata.artist,
      metadata.title
    ).catch(() => toast('Failed to update streaming encoder metadata'));
    updateWebMetadata(
      s.apiBasePath,
      s.apiUsername,
      s.apiPassword,
      metadata.artist,
      metadata.title,
      path.basename(metadata.selectedAlbumArtImage),
      path.basename(metadata.selectedMediaTypeImage),
      albumNames[path.basename(metadata.selectedAlbumArtImage)] || ''
    ).catch(() => toast('Failed to update website metadata'));
  });

  ipcMain.on('off-air', async (_event) => {
    const s = await getSettings();
    goOffAir(s.apiBasePath, s.apiUsername, s.apiPassword).catch(() => toast('Failed to update website on-air status'));
  });

  ipcMain.on('livetext', async (_event, text) => {
    const s = await getSettings();
    updateStreamingEncoderLiveText(s.streamingEncoderIp, s.streamingEncoderPort, text).catch(() => toast('Failed to update streaming encoder LiveText'));
    updateWebLiveText(s.apiBasePath, s.apiUsername, s.apiPassword, text).catch(() => toast('Failed to update website LiveText'));
  });

  function toast(message: string) {
    mainWindow.webContents.send('toast', message);
  }
}

async function loadAlbumArt() {
  const s = await getSettings();
  initializeSearchIndex();

  glob(path.join(s.albumArtDirectory, '*.*'), (_err: any, files: string[]) => {
    files.forEach(p => addToIndex(p));
  });
}

function addToIndex(filePath) {
  const ext = filePath.substr(filePath.lastIndexOf('.') + 1);
  const baseName = path.basename(filePath, ext);
  index.addDoc({
    path: filePath,
    baseName,
  });
  mapping[baseName] = filePath;
}

async function getSettings() {
  const s = (await settings.get('settings')) || {};
  return {
    apiBasePath: s.apiBasePath || '',
    streamingEncoderIp: s.streamingEncoderIp || DEFAULT_STREAMING_ENCODER_IP,
    streamingEncoderPort: s.streamingEncoderPort || DEFAULT_STREAMING_ENCODER_PORT,
    albumArtDirectory: s.albumArtDirectory || '',
    albumCSVFile: s.albumCSVFile || '',
    apiUsername: s.apiUsername || '',
    apiPassword: s.apiPassword || '',
  };
}

function initializeSearchIndex() {
  index = elasticlunr(function () {
    this.addField('baseName');
    this.setRef('baseName');
  });
  mapping = {};
}

async function loadAlbumDictionary() {
  const s = await getSettings();
  if (!s.albumCSVFile) return;

  const results: any[] = [];
  fs.createReadStream(s.albumCSVFile)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      albumNames = {};
      results.forEach((r) => {
        try {
          const filePath = r["'Cover Front'"].replace(/(^')|('$)/g, '');
          const fileName = filePath.replace(/^.*[\\\/]/, '');
          albumNames[fileName] = r["'Title'"].replace(/(^')|('$)/g, '');
        } catch (e) {
          console.log('failed to parse CSV row', e);
        }
      });
    });
}

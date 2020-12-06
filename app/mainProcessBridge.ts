import { IpcMain, dialog, BrowserWindow } from 'electron';
import { glob } from 'glob';
import path from 'path';
import elasticlunr from 'elasticlunr';
import settings from 'electron-settings';

const DEFAULT_STREAMING_ENCODER_IP = '192.168.1.200';
const DEFAULT_STREAMING_ENCODER_PORT = 9000;

elasticlunr.clearStopWords();
elasticlunr.addStopWords(['a', 'and', 'the']);

let index;
let mapping;

export default function initialize(ipcMain: IpcMain, mainWindow: BrowserWindow) {
  initializeSearchIndex();

  /**
   * Loads album art images from disk and builds the search index. Invoked on application initialization
   */
  ipcMain.on('load-album-art', loadAlbumArt);

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
    const paths = await dialog.showOpenDialogSync(mainWindow, {
      properties: ['openFile', 'openDirectory'],
    });

    if (Array.isArray(paths) && paths.length > 0) {
      event.reply('directory-picked', paths[0]);
    }
  });

  ipcMain.on('load-settings', async (event) => {
    const s = await getSettings();
    event.reply('settings', s);
  });

  ipcMain.on('store-settings', async (_event, s) => {
    await settings.set('settings', {
      apiBasePath: s.apiBasePath,
      streamingEncoderIp: s.streamingEncoderIp,
      streamingEncoderPort: s.streamingEncoderPort,
      albumArtDirectory: s.albumArtDirectory,
    });
    loadAlbumArt();
  });
}

async function loadAlbumArt() {
  const s = await getSettings();
  initializeSearchIndex();

  console.log(path.join(s.albumArtDirectory, '*.*'));

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
  };
}

function initializeSearchIndex() {
  index = elasticlunr(function () {
    this.addField('baseName');
    this.setRef('baseName');
  });
  mapping = {};
}

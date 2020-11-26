import { IpcMain} from 'electron';
import { glob } from 'glob';
import path from 'path';
import elasticlunr from 'elasticlunr';

let index;
let mapping;

export default function initialize(ipcMain: IpcMain) {
  ipcMain.on('load-album-art', event => {
    // todo: use configured path
    glob('/users/matt/desktop/artwork/*.*', (_err: any, files: string[]) => {
      index = elasticlunr(function () {
        this.addField('baseName');
        this.setRef('baseName');
      });

      // Clear baseName -> path map
      mapping = {};

      // Add to index and populate map
      files.forEach(p => addToIndex(p));
      event.reply('album-art-data', Object.keys(mapping).map(baseName => mapping[baseName]));
    });
  });

  ipcMain.on('search-album-art', (event, query) => {
    if (query === null || query === '') {
      event.reply('album-art-data', Object.keys(mapping).map(baseName => mapping[baseName]));
    } else {
      event.reply('album-art-data', index.search(query, {}).map(d => mapping[d.ref]));
    }
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

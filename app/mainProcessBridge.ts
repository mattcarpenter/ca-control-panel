import { IpcMain} from 'electron';
import { glob } from 'glob';
import path from 'path';
import elasticlunr from 'elasticlunr';

elasticlunr.clearStopWords();
elasticlunr.addStopWords(['a', 'and', 'the']);

let index;
let mapping;

export default function initialize(ipcMain: IpcMain) {

  /**
   * Loads album art images from disk and builds the search index. Invoked on application initialization
   */
  ipcMain.on('load-album-art', event => {
    // todo: use configured path
    glob('/users/matt/desktop/artwork/*.*', (_err: any, files: string[]) => {
      index = elasticlunr(function () {
        this.addField('baseName');
        this.setRef('baseName');
      });
      mapping = {};
      files.forEach(p => addToIndex(p));
    });
  });

  /**
   * Searches the search index for the given query (album name)
   */
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

import { IpcMain } from 'electron';
import { glob } from 'glob';

export default function initialize(ipcMain: IpcMain) {
  ipcMain.on('get-album-art-data', (event) => {
    // todo: use configured path
    glob('/users/matt/desktop/artwork/*.*', (_err: any, files: string[]) => {
      event.reply('album-art-data', files);
    });
  });
}

import Net from 'net';
const log = require('electron-log');

const CONN_TIMEOUT = 1000;

export const updateMetadata = (ip: string, port: any, artist: string, title: string) => {
  log.info(
    '[service/streamingEncoder#updateMetadata] updating metadata',
    ip,
    port,
    artist,
    title
  );
  return sendText(ip, port, [artist, ' - ', title, String.fromCharCode(13)].join(''));
};

export const updateLiveText = (ip: string, port: any, text: string) => {
  log.info('[service/streamingEncoder#updateLiveText] updating LiveText', ip, port, text);
  return sendText(ip, port, [text, String.fromCharCode(13)].join(''));
};

function sendText(ip: string, port: string, text: string) {
  return new Promise((resolve, reject) => {
    const client = new Net.Socket();
    const timeout = setTimeout(() => {
      client.destroy();
      log.error(
        `[service/streamingEncoder#sendText] could not connect to ${ip} on ${port} after ${CONN_TIMEOUT}ms`
      );
      reject(new Error(`Connection to Streaming Encoder timed out after ${CONN_TIMEOUT}ms`));
    }, CONN_TIMEOUT);

    log.info(
      `[service/streamingEncoder#sendText] connecting to ${ip} on ${port} to send ${text}`
    );
    client.connect({port, host: ip}, () => {
      log.info('[service/streamingEncoder#sendText] connected');
      clearTimeout(timeout);
      client.write(text);
      client.destroy();
      resolve();
    });
  });
}

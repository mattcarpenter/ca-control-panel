import Net from 'net';

export const updateMetadata = (ip: string, port: any, artist: string, title: string) => {
  return new Promise((resolve, reject) => {
    const client = new Net.Socket();
    client.connect({port, host: ip}, () => {
      client.write([artist, ' - ', title, String.fromCharCode(13)].join(''));
      client.destroy();
      resolve();
    });
  });
};

const axios = require('axios').default;
const log = require('electron-log');
const md5 = require('md5');

const UPDATE_METADATA_PATH = 'wp-json/ca/v1/meta/update';
const UPDATE_LIVETEXT_PATH = 'wp-json/ca/v1/live_text/update';
const UPDATE_SHOW_STATUS_PATH = 'wp-json/ca/v1/meta/update';

export const updateMetdata = (
  basePath: string,
  username: string,
  password: string,
  artist: string,
  title: string,
  albumArtImage: string,
  mediaTypeImage: string
) => {
  const path = makePath(basePath, UPDATE_METADATA_PATH);
  const body = {
    show_is_live: '1',
    album_cover: albumArtImage,
    // album_title: title,
    album_source: 'Vinyl',
    album_artist: artist,
    album_song: title,
  };
  const opts = {
    auth: { username, password },
  };

  log.silly('[service/web#updateMetadata] mediaTypeImage:', mediaTypeImage);
  log.info(
    '[service/web#updateMetadata] sending metadata',
    path,
    body,
    hashCreds(opts.auth)
  );

  axios
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    .post(path, body, opts)
    .catch((error) => {
      log.error('[service/web#updateMetadata] error', error);
    });
};

export const goOffAir = (
  basePath: string,
  username: string,
  password: string
) => {
  const path = makePath(basePath, UPDATE_SHOW_STATUS_PATH);
  const opts = {
    auth: { username, password },
  };

  log.info(
    '[service/web#goOffAir] sending show_is_live 0',
    path,
    hashCreds(opts.auth)
  );

  axios
    .post(
      path,
      {
        show_is_live: '0',
      },
      opts
    )
    .catch((error) => {
      log.error('[service/web#goOffAir] error', error);
    });
};

export const updateLiveText = (
  basePath: string,
  username: string,
  password: string,
  text: string
) => {
  const path = makePath(basePath, UPDATE_LIVETEXT_PATH);
  const opts = {
    auth: { username, password },
  };

  log.info(
    '[service/web#updateLiveText] updating liveText',
    path,
    text,
    hashCreds(opts.auth)
  );

  axios
    .post(
      path,
      {
        live_text: text,
      },
      opts
    )
    .catch((error) => {
      log.error('[service/web#updateLiveText] error', error);
    });
};

function makePath(basePath: string, path: string) {
  return (
    (basePath[basePath.length - 1] === '/' ? basePath : `${basePath}/`) + path
  );
}

function hashCreds(creds: { username: string; password: string }) {
  return {
    username: md5(creds.username),
    password: md5(creds.password),
  };
}
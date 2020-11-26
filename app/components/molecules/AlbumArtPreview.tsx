import React from 'react';
import styles from './AlbumArtPreview.css';
import { Image } from 'semantic-ui-react';

export default function AlbumArtPreview({ src, defaultSrc = ''}): JSX.Element {
  return (
    <div className={styles.root}>
      <Image src={src || defaultSrc} />
    </div>
  );
}

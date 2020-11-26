import React from 'react';
import styles from './Metadata.css';
import AlbumArtPreview from './AlbumArtPreview';
import MetadataText from './MetadataText';
import MediaSourcePreview from './MediaSourcePreview';

export default function Metadata({ artist, title, albumArtPath, mediaSourcePath }): JSX.Element {

  return (
    <div className={styles.root}>
      <div>Cued</div>
      <AlbumArtPreview src={albumArtPath} />
      <MetadataText text={artist} />
      <MetadataText text={title} />
      <MediaSourcePreview src={mediaSourcePath} />
    </div>
  );
}

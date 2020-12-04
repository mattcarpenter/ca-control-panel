import React from 'react';
import styles from './Metadata.css';
import AlbumArtPreview from './AlbumArtPreview';
import MetadataText from './MetadataText';
import MediaSourcePreview from './MediaSourcePreview';
import ConsoleLabel from '../atoms/ConsoleLabel.tsx';

export default function Metadata({ artist, title, albumArtPath, mediaSourcePath, metadataTitle, color1, color2 }): JSX.Element {

  return (
    <div className={styles.root}>
      <ConsoleLabel text={metadataTitle} color1={color1} color2={color2} />
      <AlbumArtPreview src={albumArtPath} />
      <MetadataText text={artist} />
      <MetadataText text={title} />
      <MediaSourcePreview src={mediaSourcePath} color1={color1} color2={color2} />
    </div>
  );
}


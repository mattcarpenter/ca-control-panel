import React from 'react';
import styles from './ControlPanel.css';
import Label from '../atoms/Label';
import AlbumArtPreview from '../molecules/AlbumArtPreview';
import Button from '../atoms/Button';
import MetadataText from '../molecules/MetadataText';
import MediaSourcePreview from '../molecules/MediaSourcePreview';
import Metadata from '../molecules/Metadata';

export default function ControlPanel({ cuedAlbumArtPath, onAirAlbumArtPath, cuedMediaSourcePath, onAirMediaSourcePath,
                                       cuedArtist, cuedTitle, onTake }): JSX.Element {
  return (
    <div className={styles.root}>
      <div>
        <Metadata
          artist={cuedArtist}
          title={cuedTitle}
          albumArtPath={cuedAlbumArtPath}
          mediaSourcePath={cuedMediaSourcePath}
        />
      </div>
      <div><Button onClick={onTake} text="Take" /></div>
      <div><Metadata /></div>
    </div>
  );
}

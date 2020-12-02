import React from 'react';
import styles from './ControlPanel.css';
import Button from '../atoms/Button';
import Metadata from '../molecules/Metadata';
import DebouncingInput from '../molecules/DebouncingInput';

export default function ControlPanel({
  cuedAlbumArtPath,
  onAirAlbumArtPath,
  cuedMediaSourcePath,
  onAirMediaSourcePath,
  cuedArtist,
  cuedTitle,
  onTake,
  onReset,
  onAirArtist,
  onAirTitle
}): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.controlPanelArea}>
        <div>
          <Metadata
            metadataTitle="Cued"
            artist={cuedArtist}
            title={cuedTitle}
            albumArtPath={cuedAlbumArtPath}
            mediaSourcePath={cuedMediaSourcePath}
          />
        </div>
        <div className={styles.takeContainer}>
          <Button onClick={onTake} text="Take" />
          <div className={styles.controlPanelLabel}>Control Panel</div>
        </div>
        <div>
          <Metadata
            metadataTitle="Air"
            artist={onAirArtist}
            title={onAirTitle}
            albumArtPath={onAirAlbumArtPath}
            mediaSourcePath={onAirMediaSourcePath}
          />
        </div>
      </div>
      <div className={styles.liveTextArea}>
        <div>
          <DebouncingInput placeholder="Live text..." />
        </div>
        <div className={styles.buttons}>
          <Button text="Send" />
          <Button text="Reset" onClick={onReset} />
        </div>
      </div>
      <div className={styles.liveTextLabel}>LiveText</div>
    </div>
  );
}

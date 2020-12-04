import React from 'react';
import styles from './ControlPanel.css';
import Button from '../atoms/Button';
import Metadata from '../molecules/Metadata';
import DebouncingInput from '../molecules/DebouncingInput';
import ConsoleLabel from '../atoms/ConsoleLabel';
import {Input} from 'semantic-ui-react';

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
  onAirTitle,
  onLiveTextChange,
  liveText,
  onSendLiveText
}): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.controlPanelArea}>
        <div>
          <Metadata
            metadataTitle="CUED"
            artist={cuedArtist}
            title={cuedTitle}
            albumArtPath={cuedAlbumArtPath}
            mediaSourcePath={cuedMediaSourcePath}
            color1="#e59a4e"
            color2="#fed741"
          />
        </div>
        <div className={styles.takeContainer}>
          <Button onClick={onTake} text="TAKE" />
          <div className={styles.controlPanelLabel}>Control Panel</div>
        </div>
        <div>
          <Metadata
            metadataTitle="AIR"
            artist={onAirArtist}
            title={onAirTitle}
            albumArtPath={onAirAlbumArtPath}
            mediaSourcePath={onAirMediaSourcePath}
            color1="#81e54e"
            color2="#4ee567"
          />
        </div>
      </div>
      <div className={styles.liveTextArea}>
        <div>
          <DebouncingInput placeholder="Live text..." onChange={onLiveTextChange} value={liveText}/>
        </div>
        <div className={styles.buttons}>
          <Button text="SEND" onClick={() => onSendLiveText(liveText)} />
          <Button text="RESET" onClick={onReset} />
        </div>
      </div>
      <div className={styles.liveTextLabel}>LiveText</div>
    </div>
  );
}

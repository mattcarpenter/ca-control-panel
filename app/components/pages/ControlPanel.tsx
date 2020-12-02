import React from 'react';
import styles from './ControlPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAlbumArtImages,
  setSelectedAlbumArtImage,
  selectMediaSelectionSelectedMediaTypeImage,
  setMediaSelectionArtist,
  setMediaSelectionTitle,
  setMediaSelectionMediaTypeImage,
  selectMediaSelectionSelectedAlbumArtImage,
  selectCuedMetadata,
  selectOnAirMetadata,
  cue,
  take,
  reset, selectMediaSelectionTitle, selectMediaSelectionArtist,
} from '../../controlPanelSlice';
import MediaSelectionPanel from '../organisms/MediaSelectionPanel';
import ControlPanelSection from '../organisms/ControlPanel';
import RendererProcessBridge from '../../lib/rendererProcessBridge';
import ChoiceAnalogLogo from '../molecules/ChoiceAnalogLogo';
import {Button, Icon} from 'semantic-ui-react';

const renderProcessBridge = RendererProcessBridge.getInstance();

export default function ControlPanel(): JSX.Element {
  const albumArtImages = useSelector(selectAlbumArtImages);
  const selectedMediaType = useSelector(
    selectMediaSelectionSelectedMediaTypeImage
  );
  const selectedAlbumArt = useSelector(
    selectMediaSelectionSelectedAlbumArtImage
  );
  const selectedTitle = useSelector(selectMediaSelectionTitle);
  const selectedArtist = useSelector(selectMediaSelectionArtist);
  const cuedMetadata = useSelector(selectCuedMetadata);
  const onAirMetadata = useSelector(selectOnAirMetadata);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChoiceAnalogLogo />
        <div className={styles.menu}>
          <Button icon="settings" size="small" />
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.left}>
          <MediaSelectionPanel
            albumArtImages={albumArtImages}
            onTitleChange={(title: string) => dispatch(setMediaSelectionTitle(title))}
            onArtistChange={(artist: string) => dispatch(setMediaSelectionArtist(artist))}
            onArtistBlur={() => renderProcessBridge.searchAlbumArt()}
            onAlbumArtSelection={(src: string) => dispatch(setSelectedAlbumArtImage(src))}
            onMediaTypeSelection={(src: string) => dispatch(setMediaSelectionMediaTypeImage(src))}
            selectedAlbumArt={selectedAlbumArt}
            selectedMediaType={selectedMediaType}
            artist={selectedArtist}
            title={selectedTitle}
            onCue={() => dispatch(cue())}
          />
        </div>
        <div className={styles.right}>
          <ControlPanelSection
            cuedArtist={cuedMetadata.artist}
            cuedTitle={cuedMetadata.title}
            cuedAlbumArtPath={cuedMetadata.selectedAlbumArtImage}
            cuedMediaSourcePath={cuedMetadata.selectedMediaTypeImage}
            onAirArtist={onAirMetadata.artist}
            onAirTitle={onAirMetadata.title}
            onAirAlbumArtPath={onAirMetadata.selectedAlbumArtImage}
            onAirMediaSourcePath={onAirMetadata.selectedMediaTypeImage}
            onTake={() => dispatch(take())}
            onReset={() => dispatch(reset())}
          />
        </div>
      </div>
    </div>
  );
}

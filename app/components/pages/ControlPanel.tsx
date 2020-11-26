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
} from '../../controlPanelSlice';
import MediaSelectionPanel from '../organisms/MediaSelectionPanel';
import ControlPanelSection from '../organisms/ControlPanel';
import RendererProcessBridge from '../../lib/rendererProcessBridge';

const renderProcessBridge = RendererProcessBridge.getInstance();

export default function ControlPanel(): JSX.Element {
  const albumArtImages = useSelector(selectAlbumArtImages);
  const selectedMediaType = useSelector(
    selectMediaSelectionSelectedMediaTypeImage
  );
  const selectedAlbumArt = useSelector(
    selectMediaSelectionSelectedAlbumArtImage
  );
  const cuedMetadata = useSelector(selectCuedMetadata);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
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
          onCue={() => dispatch(cue())}
        />
      </div>
      <div className={styles.right}>
        <ControlPanelSection
          cuedArtist={cuedMetadata.artist}
          cuedTitle={cuedMetadata.title}
          cuedAlbumArtPath={cuedMetadata.selectedAlbumArtImage}
          cuedMediaSourcePath={cuedMetadata.selectedMediaTypeImage}
          onTake={() => dispatch(take())}
        />
      </div>
    </div>
  );
}

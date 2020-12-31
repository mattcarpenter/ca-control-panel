import React, { useState } from 'react';
import styles from './ControlPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';
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
  reset,
  selectMediaSelectionTitle,
  selectMediaSelectionArtist,
  selectLiveText,
  setLiveText,
  sendLiveText,
  clearLiveText,
} from '../../controlPanelSlice';
import MediaSelectionPanel from '../organisms/MediaSelectionPanel';
import ControlPanelSection from '../organisms/ControlPanel';
import RendererProcessBridge from '../../lib/rendererProcessBridge';
import ChoiceAnalogLogo from '../molecules/ChoiceAnalogLogo';
import { Button } from 'semantic-ui-react';
import SettingsModal from '../organisms/SettingsModal';

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
  const liveText = useSelector(selectLiveText);

  const dispatch = useDispatch();
  const [liveTextTimeout, setLiveTextTimeout] = useState<any>(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);

  function handleLiveTextSend() {
    // todo - send to website
    dispatch(sendLiveText());
    clearTimeout(liveTextTimeout);
    setLiveTextTimeout(
      setTimeout(() => {
        // todo - clear from website
        dispatch(clearLiveText());
      }, 10 * 1000) // todo - set correct timeout
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ChoiceAnalogLogo />
        <div className={styles.menu}>
          <Button
            icon="settings"
            size="small"
            onClick={() => setSettingsModalOpen(true)}
          />
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
            onLiveTextChange={(text: string) => dispatch(setLiveText(text))}
            liveText={liveText}
            onSendLiveText={handleLiveTextSend}
          />
        </div>
      </div>
      <SettingsModal
        onClose={() => setSettingsModalOpen(false)}
        open={settingsModalOpen}
      />
      <ToastsContainer
        position={ToastsContainerPosition.BOTTOM_RIGHT}
        store={ToastsStore}
      />
    </div>
  );
}

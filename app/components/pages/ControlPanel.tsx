import React from 'react';
import styles from './ControlPanel.css';
import AlbumArtGrid from '../organisms/AlbumArtGrid';
import AlbumArtSearch from '../organisms/AlbumArtSearch';
import Button from '../atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAlbumArtImages,
  setSelectedAlbumArtImage,
  setMediaSelectionArtist,
  setMediaSelectionTitle,
} from '../../controlPanelSlice';
import MediaTypeGrid from '../organisms/MediaTypeGrid';

export default function ControlPanel(): JSX.Element {
  const albumArtImages = useSelector(selectAlbumArtImages);
  const dispatch = useDispatch();

  function handleAlbumArtSelection(img: string | null) {
    dispatch(setSelectedAlbumArtImage(img));
  }

  function handleArtistChange(artist: string) {
    // todo: implement search on BLUR
    dispatch(setMediaSelectionArtist(artist));
  }

  function handleTitleChange(title: string) {
    dispatch(setMediaSelectionTitle(title));
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.mediaSelectionGallery}>
          <AlbumArtGrid
            images={albumArtImages}
            onSelection={handleAlbumArtSelection}
          />
        </div>
        <div className={styles.mediaSelectionFooter}>
          <AlbumArtSearch
            onArtistChange={handleArtistChange}
            onTitleChange={handleTitleChange}
          />
          <div className={styles.mediaSelectionAndCue}>
            <MediaTypeGrid />
            <div className={styles.cueContainer}>
              <div>
                <Button />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>Right</div>
    </div>
  );
}

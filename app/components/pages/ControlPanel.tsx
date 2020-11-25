import React from 'react';
import styles from './ControlPanel.css';
import AlbumArtGrid from '../organisms/AlbumArtGrid';
import { useSelector } from 'react-redux';

export default function ControlPanel(): JSX.Element {

  const albumArtImages = useSelector(state => state.controlPanel.albumArtImages);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.mediaSelectionGallery}>
          <AlbumArtGrid images={albumArtImages} />
        </div>
        <div className={styles.mediaSelectionFooter}>Footer</div>
      </div>
      <div className={styles.right}>Right</div>
    </div>
  );
}

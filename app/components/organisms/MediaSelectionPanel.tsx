import React from 'react';
import styles from './MediaSelectionPanel.css';
import AlbumArtGrid from './AlbumArtGrid';
import AlbumArtSearch from './AlbumArtSearch';
import MediaTypeGrid from './MediaTypeGrid';
import Button from '../atoms/Button';

export default function MediaSelectionPanel({ albumArtImages, onAlbumArtSelection, selectedAlbumArt, onArtistChange,
                                              onTitleChange, onArtistBlur, onMediaTypeSelection, selectedMediaType, onCue, artist, title }): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.mediaSelectionGallery}>
        <AlbumArtGrid
          images={albumArtImages}
          onSelection={onAlbumArtSelection}
          selectedImage={selectedAlbumArt}
        />
      </div>
      <div className={styles.mediaSelectionFooter}>
        <AlbumArtSearch
          onArtistChange={onArtistChange}
          onTitleChange={onTitleChange}
          onArtistBlur={onArtistBlur}
          artist={artist}
          title={title}
        />
        <div className={styles.mediaSelectionAndCue}>
          <MediaTypeGrid
            onSelection={onMediaTypeSelection}
            selectedImage={selectedMediaType}
          />
          <div className={styles.cueContainer}>
            <div>
              <Button text="Cue" onClick={onCue} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mediaSelectionLabel}>Media Selection</div>
    </div>
  );
}

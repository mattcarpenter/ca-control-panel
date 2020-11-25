import React, { useState } from 'react';
import styles from './AlbumArtGrid.css';
import SelectableImage from '../molecules/SelectableImage';

export default function AlbumArtGrid({ images, onSelection, selectedImage }): JSX.Element {

  function handleClick(src: string | null) {
    onSelection(src);
  }

  return (
    <div className={styles.root} onClick={() => {handleClick(null)}}>
      <div className={styles.container}>
        {images.map((img: string, index: number) => (
          <SelectableImage
            key={index}
            src={img}
            onClick={handleClick}
            selected={selectedImage == img}
            className={styles.cell}
            local
          />
        ))}
      </div>
    </div>
  );
}

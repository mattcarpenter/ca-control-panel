import React, { useState } from 'react';
import SelectableImage from '../molecules/SelectableImage';
import styles from './MediaTypeGrid.css';

const images = [
  'assets/images/vinyl.jpg',
  'assets/images/reel-to-reel.jpg',
  'assets/images/hi-res.jpg',
  'assets/images/cassette.jpg',
];

export default function MediaTypeGrid({ onSelection, selectedImage }): JSX.Element {

  function handleOnClick(src: string) {
    onSelection(src);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if(event.keyCode === 32 || event.keyCode == 13) {
      onSelection(event.currentTarget.value);
    }
  }

  // @ts-ignore
  return (
    <div className={styles.root}>
      {images.map((src, index) => (
        <label key={index}>
          <input
            type="radio"
            name="mediaType"
            value={src}
            onKeyDown={(event) => handleKeyDown(event)}
          />
          <SelectableImage
            onClick={handleOnClick}
            src={src}
            selected={src === selectedImage}
          />
        </label>
      ))}
    </div>
  );
}

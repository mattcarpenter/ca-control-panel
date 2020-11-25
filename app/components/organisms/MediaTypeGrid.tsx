import React, { useState } from 'react';
import SelectableImage from '../molecules/SelectableImage';
import styles from './MediaTypeGrid.css';

const images = [
  'assets/images/vinyl.jpg',
  'assets/images/reel-to-reel.jpg',
  'assets/images/hi-res.jpg',
  'assets/images/cassette.jpg',
];

export default function MediaTypeGrid(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string>('');

  function handleOnClick(src: string) {
    setSelectedImage(src);
  }

  return (
    <div className={styles.root}>
      {images.map((src, index) => (
        <SelectableImage
          onClick={handleOnClick}
          src={src}
          key={index}
          selected={src === selectedImage}
        />
      ))}
    </div>
  );
}

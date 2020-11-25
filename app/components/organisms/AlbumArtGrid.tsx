import React from 'react';
import styles from './AlbumArtGrid.css';

export default function AlbumArtGrid({images}): JSX.Element {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {images.map((img: string, index: number) => (
          <div className={styles.cell} key={index}><img src={`file://${img}`} /></div>
        ))}
      </div>
    </div>
  );
}

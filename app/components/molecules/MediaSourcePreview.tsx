import React from 'react';
import Image from '../atoms/Image';
import styles from './MediaSourcePreview.css';

export default function MediaSourcePreview({ src }): JSX.Element {
  return (
    <div className={styles.root}>
      {src && <Image src={src} />}
    </div>
  );
}

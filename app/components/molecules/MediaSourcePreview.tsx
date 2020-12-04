import React from 'react';
import Image from '../atoms/Image';
import styles from './MediaSourcePreview.css';

export default function MediaSourcePreview({ src, color1, color2 }): JSX.Element {
  if (src) {
    return (
      <div
        className={styles.nonEmptyRoot}
        style={{
          background: `linear-gradient(to right, ${color1}, ${color2})`,
        }}
      >
        {src && <Image src={src} />}
      </div>
    );
  }

  return <div className={styles.emptyRoot} />;
}

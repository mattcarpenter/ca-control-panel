import React from 'react';
import styles from './MetadataText.css';

export default function MetadataText({ text }): JSX.Element {
  return (
    <div className={styles.root}>
      {text}
    </div>
  )
}

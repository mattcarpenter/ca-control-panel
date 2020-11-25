import React from 'react';
import styles from './AlbumArtSearch.css';
import DebouncingInput from '../molecules/DebouncingInput';
import { Input } from 'semantic-ui-react';

export default function AlbumArtSearch({ onArtistChange, onTitleChange, onArtistBlur }): JSX.Element {
  return (
    <div className={styles.root}>
      <div>
        <DebouncingInput placeholder="Artist..." onChange={onArtistChange} onBlur={onArtistBlur} />
      </div>
      <div>
        <DebouncingInput placeholder="Title..." onChange={onTitleChange} />
      </div>
    </div>
  );
}

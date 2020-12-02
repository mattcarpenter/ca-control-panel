import React from 'react';
import styles from './AlbumArtSearch.css';
import DebouncingInput from '../molecules/DebouncingInput';
import { Input } from 'semantic-ui-react';

export default function AlbumArtSearch({ onArtistChange, onTitleChange, onArtistBlur, artist, title }): JSX.Element {
  return (
    <div className={styles.root}>
      <div>
        <DebouncingInput placeholder="Artist..." onChange={onArtistChange} onBlur={onArtistBlur} value={artist} />
      </div>
      <div>
        <DebouncingInput placeholder="Title..." onChange={onTitleChange} value={title} />
      </div>
    </div>
  );
}

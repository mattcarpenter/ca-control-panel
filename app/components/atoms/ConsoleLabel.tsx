import React from 'react';
import styles from './ConsoleLabel.css';

export default function ConsoleLabel({text, color1, color2}): JSX.Element {
  return (
    <div className={styles.root} style={{background: `linear-gradient(to right, ${color1}, ${color2})`}}>
      <div className={styles.content} style={{color: color2, textShadow: `0 0 5px ${color1}`}}>{text}</div>
    </div>
  );
}

// Alert.jsx
import styles from './Alert.module.css';
import { useState } from 'react';

function Alert({ message, style, setShow }) {
  const [hide, setHide] = useState(false);

  return (
    <div className={`${styles[style]} ${!hide ? styles.show : styles.hide}`}>
      {message}
      <button
        className={styles.button}
        onClick={() => {
          setHide(true);
          setShow(false);
        }}
      >
        &#x2716;
      </button>
    </div>
  );
}

export default Alert;

import styles from './Logo.module.css';

function Logo() {
  return (
    <img
      src="/images/landQuest.png"
      alt="landQuestlogo"
      className={styles.logo}
    />
  );
}

export default Logo;

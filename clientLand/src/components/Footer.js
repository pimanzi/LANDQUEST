import styles from './Footer.module.css';
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.main}>
        <h2>LandQuest</h2>
        <div className={styles.contact}>
          <h3> Contact</h3>
          <p>
            <img src="/images/carbon_location-filled.png" alt="Location Icon" />
            <span>N. 72 KN5 Road, Remera Kigali</span>
          </p>
          <p>
            <img
              src="/images/material-symbols_mail-outline.png"
              alt="Mail Icon"
            />
            <a href="mailto:imanzikplacide603@gmail.com">Mail Us</a>
          </p>
          <p>
            <img src="/images/ic_baseline-phone.png" alt="Phone Icon" />
            <span>+250 790101642</span>
          </p>
        </div>
      </div>
      <div className={styles.social}>
        <div className={styles.container}>
          <a href="#">
            {' '}
            <img src="/images/instagram.png"></img>
          </a>
        </div>

        <div className={styles.container}>
          <a href="#">
            {' '}
            <img src="/images/facebook.png"></img>
          </a>
        </div>

        <div className={styles.container}>
          <a href="#">
            {' '}
            <img src="/images/xIcon.png"></img>
          </a>
        </div>
      </div>

      <p className={styles.copy}> &copy; Copyright {year} by LandQuest </p>
    </footer>
  );
}

export default Footer;

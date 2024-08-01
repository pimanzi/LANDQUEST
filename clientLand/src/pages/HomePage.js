import React from 'react';
import styles from './HomePage.module.css';
import PageNav from '../components/PageNav';
import Lands from '../components/Lands';
import Footer from '../components/Footer';
function HomePage() {
  return (
    <div className={styles.main}>
      <PageNav></PageNav>
      <section className={styles.hero}>
        <h1>LandQuest</h1>
        <div>
          <div className={styles.welcome}>
            <h2>
              Welcome to <span>LandQuest</span>
            </h2>
            <p>Find the best place to live in Rwanda</p>
            <button>Get Started</button>
          </div>
          <div className={styles.img}>
            <img src="/images/homeImg1.jpeg" alt="heroImage"></img>
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <h2>
          Why <span>LandQuest</span>
        </h2>
        <div className={styles.abt}>
          <img src="/images/aboutImg.jpeg"></img>
          <p>
            Welcome to LandQuest, your premier platform for connecting land
            sellers and buyers across Rwanda. We bridge the gap between those
            with land to sell and those seeking land to buy or to rent, ensuring
            a transparent and efficient marketplace. Our platform provides
            up-to-date information on available lands, promoting better land
            distribution and utilization to alleviate urban overcrowding. Join
            LandQuest today and be part of a community dedicated to transforming
            Rwanda land market. Together, we can create opportunities and drive
            growth across the country.
          </p>
        </div>
      </section>

      <Lands></Lands>

      <Footer></Footer>
    </div>
  );
}

export default HomePage;

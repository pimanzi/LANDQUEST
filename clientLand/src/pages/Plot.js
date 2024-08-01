import { useNavigate, useParams } from 'react-router-dom';
import styles from './Plot.module.css';
import { useLands } from '../components/LandsProvider';
import { useEffect, useState } from 'react';

function Plot() {
  const [owner, setOwner] = useState('');
  const { id } = useParams();
  const landId = Number(id);
  const { lands } = useLands();
  console.log(lands);
  const land = lands.filter((land) => land.id === landId);
  console.log(land[0]);
  const { user_id, upi, size, location, price, info, img } = land[0];
  console.log(location);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await fetch(`/api/plot/land/owner/${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOwner(data);
      } catch (error) {
        console.error('Failed to fetch owner details:', error);
        throw error;
      }
    };
    fetchOwnerDetails();
  }, []);
  return (
    <div className={styles.plot}>
      <h2>
        {' '}
        <button className={styles.back} onClick={() => navigate(-1)}>
          &larr;
        </button>
        Land in {location}
      </h2>
      <div className={styles.details}>
        <div className={styles.plotImg}>
          <img src={img} alt="plot" />
        </div>

        <div className={styles.contact}>
          <h3>Contact listing owner</h3>
          <div className={styles.contactContainer}>
            <img
              src={owner.image_file}
              className={styles.profilePicture}
              alt="profile"
            />

            <div className={styles.personalDetails}>
              <p className={styles.name}>
                {owner.lastName} {owner.firstName}
              </p>
              <p>
                <img src="/images/smartphone1.png" alt="phone icon" />
                <span>{owner.number}</span>
              </p>
              <p>
                <img src="/images/watsapp.png" alt="whatsapp icon" />
                <span>{owner.number}</span>
              </p>
            </div>
          </div>

          <div>
            <form>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="E-mail" />
              <input type="tel" placeholder="Phone Number" />
              <div className={styles.buttonCont}>
                <button type="button">Chat with me</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.overview}>
        <h3>Overview</h3>
        <div className={styles.icons}>
          <div>
            <div>
              <img src="/images/Frame43.png" alt="icon"></img>
            </div>
            <div>
              <p className={styles.property}>UPI</p>
              <p className={styles.value}>{upi}</p>
            </div>
          </div>
          <div>
            <div>
              <img src="/images/Frame44.png" alt="icon"></img>
            </div>
            <div>
              <p className={styles.property}>Type</p>
              <p className={styles.value}>Land</p>
            </div>
          </div>

          <div>
            <div>
              <img src="/images/Frame45.png" alt="icon"></img>
            </div>
            <div>
              <p className={styles.property}>SQM</p>
              <p className={styles.value}>{size}</p>
            </div>
          </div>

          <div>
            <div>
              <img src="/images/Frame46.png" alt="icon"></img>
            </div>
            <div>
              <p className={styles.property}>Purpose</p>
              <p className={styles.value}>Sale</p>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className={styles.info}>
          <h4>Deep Details</h4>
          <p>{info}</p>
        </div>
      </div>
    </div>
  );
}

export default Plot;

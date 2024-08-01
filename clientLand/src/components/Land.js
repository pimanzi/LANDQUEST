import { useNavigate } from 'react-router-dom';
import styles from './Land.module.css';
import { Link } from 'react-router-dom';
function Land({ land }) {
  const navigate = useNavigate();
  return (
    <li className={styles.land}>
      <img src={land.img} alt="land"></img>
      <p className={styles.price}>{land.price} RWF</p>
      <p className={styles.location}>
        {' '}
        <img src="/images/mingcute_location-line.png" alt="icon"></img>
        <span>{land.location}</span>
      </p>
      <p className={styles.size}>
        {' '}
        <img src="/images/geo_turf-size.png" alt="icon"></img>{' '}
        <span>{land.size} SQM</span>
      </p>
      <Link to={`/services/buy/${land.id}`}>
        <button className={styles.view}>view details</button>
      </Link>
    </li>
  );
}

export default Land;

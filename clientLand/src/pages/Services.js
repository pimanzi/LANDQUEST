import styles from './Services.module.css';
import ServiceNav from '../components/ServiceNav';
import AllLands from '../components/AllLands';
import { Outlet, useNavigate } from 'react-router-dom';

function Services({ lands }) {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <button onClick={() => navigate(-1)} className={styles.back}>
          &larr;
        </button>
        <h2>Services</h2>
      </div>
      <ServiceNav></ServiceNav>

      <Outlet lands={lands}></Outlet>
    </div>
  );
}

export default Services;

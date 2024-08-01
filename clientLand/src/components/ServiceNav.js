import { NavLink } from 'react-router-dom';
import styles from './ServiceNav.module.css';
function ServiceNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="buy">Buy</NavLink>
        </li>
        <li>
          <NavLink to="sellLand">Sell Land</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ServiceNav;

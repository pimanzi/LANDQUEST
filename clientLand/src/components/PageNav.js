import styles from './PageNav.module.css';
import Logo from './Logo.js';
import { NavLink, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from './AuthContext.js';

function PageNav() {
  const { auth } = useAuth();
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li>
          <HashLink to="/#about">About Us</HashLink>
        </li>
        <li>
          <HashLink to="/#lands">Lands</HashLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <HashLink to="/#contact">Contact</HashLink>
        </li>
        <li>
          {auth ? (
            <Link
              to={`profile/${auth.userName}`}
              className={auth ? styles.img : ''}
            >
              <img src={`${auth.image_file}`} alt="profilePicture"></img>
              <p>
                Hello, <span>{auth.userName}</span>
              </p>
            </Link>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink> |{' '}
              <NavLink to="/register" className={styles.register}>
                Register
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

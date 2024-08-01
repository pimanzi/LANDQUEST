import styles from './Lands.module.css';
import Land from './Land';
import { useLands } from './LandsProvider';
import { useNavigate } from 'react-router-dom';
function Lands() {
  const naigate = useNavigate();
  const { lands } = useLands();
  const newLands = lands.reverse().slice(0, 6);

  return (
    <section className={styles.lands} id="lands">
      <h2>
        Available <span>Lands</span>{' '}
      </h2>
      <ul>
        {newLands.map((land) => (
          <Land land={land} key={land.id}></Land>
        ))}
      </ul>

      <button className={styles.view} onClick={() => naigate('/services')}>
        View More Lands
      </button>
    </section>
  );
}

export default Lands;

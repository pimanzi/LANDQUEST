import styles from './AllLands.module.css';
import Land from './Land';
import { useLands } from './LandsProvider';
function AllLands() {
  const { lands } = useLands();
  return (
    <section className={styles.lands} id="lands">
      <h2>
        <span>Lands</span>{' '}
      </h2>
      <ul>
        {lands.map((land) => (
          <Land land={land} key={land.id}></Land>
        ))}
      </ul>
    </section>
  );
}

export default AllLands;

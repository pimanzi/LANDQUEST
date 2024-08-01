import { createContext, useState, useEffect, useContext } from 'react';

export const LandsContext = createContext();

const LandsProvider = ({ children }) => {
  const [lands, setLands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLands() {
      try {
        const response = await fetch('/api/plot/lands');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setLands(result);
      } catch (err) {
        console.error('Failed to fetch lands:', err);
        setError(err.message);
      }
    }
    fetchLands();
  }, []);

  return (
    <LandsContext.Provider value={{ lands, setLands, error }}>
      {children}
    </LandsContext.Provider>
  );
};

function useLands() {
  const context = useContext(LandsContext);
  if (!context) {
    throw new Error('useLands must be used within a LandsProvider');
  }
  return context;
}

export { LandsProvider, useLands };

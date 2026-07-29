import { useEffect, useState } from 'react';

/**
 * Suscribe a una media query. Arranca en `false` para que el primer render
 * del servidor/cliente coincida y recién después mide el dispositivo real.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = event => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

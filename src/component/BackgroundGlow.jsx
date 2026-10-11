import { useEffect, useState } from 'react';
import clsx from 'clsx';

/**
 * Manchas verdes difuminadas de fondo para toda la página. Con el hero a la
 * vista van con la intensidad completa; fuera de él se atenúan.
 */
export default function BackgroundGlow() {
  const [dim, setDim] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setDim(!entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={clsx('bg-glow', dim && 'is-dim')} aria-hidden="true">
      <span className="bg-glow-blob bg-glow-blob--a" />
      <span className="bg-glow-blob bg-glow-blob--b" />
      <span className="bg-glow-blob bg-glow-blob--c" />
    </div>
  );
}

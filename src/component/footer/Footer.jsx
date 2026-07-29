import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { useHorizontalDrift } from '../../hooks/useParallax';
import { scrollToTop } from '../../hooks/useSmoothScroll';
import { profile } from '../../data/profile';
import './footer.css';

export default function Footer() {
  const wordmarkRef = useRef(null);

  useHorizontalDrift(wordmarkRef, { distance: 160 });

  return (
    <footer className="footer">
      <div className="footer-wordmark-wrap" aria-hidden="true">
        <span className="footer-wordmark" ref={wordmarkRef}>
          {profile.firstName} {profile.lastName} — {profile.firstName}{' '}
          {profile.lastName} —
        </span>
      </div>

      <div className="shell footer-inner">
        <div className="footer-col">
          <span className="mono footer-label">Ubicación</span>
          <span className="footer-value">{profile.location}</span>
        </div>

        <div className="footer-col">
          <span className="mono footer-label">Disponibilidad</span>
          <span className="footer-value">
            {profile.available ? 'Abierto a propuestas' : 'Sin disponibilidad'}
          </span>
        </div>

        <div className="footer-col footer-col--links">
          <span className="mono footer-label">Redes</span>
          <div className="footer-links">
            {profile.socials
              .filter(social => social.label !== 'Email')
              .map(social => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-sweep"
                  data-cursor="hover"
                >
                  {social.label}
                </a>
              ))}
          </div>
        </div>

        <button
          type="button"
          className="footer-top"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          data-cursor="hover"
        >
          <ArrowUp size={16} strokeWidth={1.7} />
          <span className="mono">Arriba</span>
        </button>
      </div>

      <div className="shell footer-legal">
        <span className="mono">
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
        </span>
      </div>
    </footer>
  );
}

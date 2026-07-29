import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import ThemeToggle from '../ThemeToggle';
import Magnetic from '../Magnetic';
import { navLinks, profile } from '../../data/profile';
import { lockScroll, scrollToSection } from '../../hooks/useSmoothScroll';
import './navbar.css';

const SECTION_IDS = [...navLinks.map(link => link.id), 'contactMe'];
const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('aboutMe');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Marca en el nav la sección que se está viendo.
  useEffect(() => {
    const sections = SECTION_IDS.map(id => document.getElementById(id)).filter(
      Boolean
    );
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    // Esperamos a que se libere el scroll antes de animar hacia la sección.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header className={clsx('nav', scrolled && 'is-scrolled')}>
        <div className="nav-inner shell">
          <a
            href="#aboutMe"
            className="nav-brand"
            onClick={event => go(event, 'aboutMe')}
            data-cursor="hover"
          >
            <span className="nav-monogram">JC</span>
            <span className="nav-brand-text">
              <strong>{profile.firstName} {profile.lastName}</strong>
              <span className="mono nav-brand-role">{profile.role}</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={clsx('nav-link', active === link.id && 'is-active')}
                onClick={event => go(event, link.id)}
                data-cursor="hover"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggle className="nav-icon-btn" />

            <Magnetic className="nav-cta-wrap" strength={0.18}>
              <a
                href="#contactMe"
                className="btn nav-cta"
                onClick={event => go(event, 'contactMe')}
                data-cursor="hover"
              >
                Contáctame
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </a>
            </Magnetic>

            <button
              type="button"
              className={clsx('nav-burger', menuOpen && 'is-open')}
              onClick={() => setMenuOpen(open => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <motion.div className="nav-progress" style={{ scaleX: progress }} />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="nav-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="nav-overlay-links">
              {[...navLinks, { id: 'contactMe', label: 'Contacto' }].map(
                (link, i) => (
                  <span className="anim-line-mask" key={link.id}>
                    <motion.a
                      href={`#${link.id}`}
                      className="display nav-overlay-link anim-line"
                      onClick={event => go(event, link.id)}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%' }}
                      transition={{
                        duration: 0.7,
                        delay: 0.12 + i * 0.06,
                        ease: EASE,
                      }}
                    >
                      <span className="mono nav-overlay-index">
                        0{i + 1}
                      </span>
                      {link.label}
                    </motion.a>
                  </span>
                )
              )}
            </nav>

            <motion.div
              className="nav-overlay-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <a href={`mailto:${profile.email}`} className="link-sweep">
                {profile.email}
              </a>
              <div className="nav-overlay-socials">
                {profile.socials
                  .filter(social => social.label !== 'Email')
                  .map(social => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mono link-sweep"
                    >
                      {social.label}
                    </a>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Reveal, { AnimatedText, Counter } from '../Reveal';
import Magnetic from '../Magnetic';
import Marquee from '../Marquee';
import useParallax from '../../hooks/useParallax';
import { scrollToSection } from '../../hooks/useSmoothScroll';
import { getProfile } from '../../services/gitHubServ';
import {
  profile,
  stack,
  tickerWords,
  yearsOfExperience,
} from '../../data/profile';
import './about.css';

export default function AboutMe() {
  const [gitHub, setGitHub] = useState(null);
  const portraitRef = useRef(null);
  const reduce = useReducedMotion();

  useParallax(portraitRef, { distance: 56 });

  // El perfil de GitHub alimenta la métrica de repos. Si falla, la sección
  // sigue funcionando y mostramos un guión en lugar del número.
  useEffect(() => {
    let cancelled = false;

    Promise.resolve(getProfile())
      .then(data => {
        if (!cancelled) setGitHub(data);
      })
      .catch(error => {
        console.error(`Error Fetch getProfile: ${error}`);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const techCount = stack.reduce(
    (total, group) => total + group.items.length,
    0
  );

  const stats = [
    {
      id: 'years',
      value: yearsOfExperience(),
      suffix: '+',
      label: 'Años de experiencia',
    },
    {
      id: 'repos',
      value: gitHub?.public_repos ?? null,
      suffix: '',
      label: 'Proyectos públicos',
    },
    { id: 'tech', value: techCount, suffix: '+', label: 'Tecnologías' },
  ];

  return (
    <div className="hero">
      <div className="shell">

        {/* El retrato va en la misma fila que el nombre y alineado por abajo,
            así queda a la altura del apellido en desktop. */}
        <div className="hero-head">
          <h1 className="hero-title">
            <AnimatedText
              as="span"
              text={profile.firstName}
              className="display hero-line"
              stagger={0.045}
            />
            <AnimatedText
              as="span"
              text={profile.lastName}
              className="display hero-line hero-line--indent"
              stagger={0.045}
              delay={0.16}
            />
          </h1>

          <div className="hero-visual">
            <div className="hero-portrait" ref={portraitRef}>
              <span className="hero-portrait-plate" aria-hidden="true" />

              {/* El marco recorta el zoom del hover; el grano le da textura
                  impresa en lugar de una foto pegada y lisa. */}
              <motion.span
                className="hero-portrait-frame"
                initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
                animate={reduce ? undefined : { clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              >
                <motion.img
                  src={profile.avatar}
                  alt={`Retrato de ${profile.firstName} ${profile.lastName}`}
                  width={871}
                  height={960}
                  fetchPriority="high"
                  decoding="async"
                  initial={reduce ? false : { scale: 1.22 }}
                  animate={reduce ? undefined : { scale: 1 }}
                  transition={{
                    duration: 1.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.35,
                  }}
                />
                <span className="hero-portrait-grain" aria-hidden="true" />
              </motion.span>

              <span className="hero-portrait-caption mono" aria-hidden="true">
                {profile.location}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-body">
          <div className="hero-intro">
            <Reveal y={20} delay={0.15}>
              <p className="lede">{profile.intro}</p>
            </Reveal>

            <Reveal className="hero-actions" y={20} delay={0.25}>
              <Magnetic strength={0.2}>
                <a
                  href="#projects"
                  className="btn btn--solid btn--lg"
                  onClick={event => {
                    event.preventDefault();
                    scrollToSection('projects');
                  }}
                  data-cursor="hover"
                >
                  Ver proyectos
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#contactMe"
                  className="btn btn--lg"
                  onClick={event => {
                    event.preventDefault();
                    scrollToSection('contactMe');
                  }}
                  data-cursor="hover"
                >
                  Escribime
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </a>
              </Magnetic>
            </Reveal>

            {profile.available && (
              <Reveal className="hero-badge" y={16} delay={0.35}>
                <span className="hero-dot" aria-hidden="true" />
                <span className="mono">
                  Abierto a oportunidades y colaboraciones
                </span>
              </Reveal>
            )}
          </div>
        </div>

        <Reveal className="hero-stats" y={22} delay={0.1}>
          {stats.map(stat => (
            <div className="hero-stat" key={stat.id}>
              <span className="display hero-stat-value">
                {stat.value === null ? (
                  '—'
                ) : (
                  <>
                    {stat.suffix}
                    <Counter value={stat.value} />
                  </>
                )}
              </span>
              <span className="mono hero-stat-label">{stat.label}</span>
            </div>
          ))}

          <button
            type="button"
            className="hero-scroll"
            onClick={() => scrollToSection('experience')}
            data-cursor="hover"
          >
            <span className="mono">Scroll</span>
            <motion.span
              className="hero-scroll-icon"
              animate={reduce ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={15} strokeWidth={1.8} />
            </motion.span>
          </button>
        </Reveal>
      </div>

      <div className="hero-ticker">
        <Marquee speed={2.4}>
          {tickerWords.map(word => (
            <span className="hero-ticker-item display" key={word}>
              {word}
              <span className="hero-ticker-dot" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

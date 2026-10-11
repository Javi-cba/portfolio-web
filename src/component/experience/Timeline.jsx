import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import Reveal from '../Reveal';
import { education, experience } from '../../data/profile';
import './timeline.css';

/** Convierte `**texto**` en <strong> para resaltar lo importante. */
function emphasize(text) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/** Riel + lista. Lo usan tanto la experiencia laboral como la formación. */
function TimelineList({ items }) {
  const trackRef = useRef(null);

  // La línea vertical se "dibuja" según el avance del scroll sobre la lista.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="tl" ref={trackRef}>
      <div className="tl-rail" aria-hidden="true">
        <motion.span className="tl-rail-fill" style={{ scaleY }} />
      </div>

      <ol className="tl-list">
        {items.map((item, index) => {
          const badge = item.badge ?? (item.current ? 'Actualidad' : null);

          return (
            <li className="tl-item" key={item.id}>
              <Reveal className="tl-marker" y={0} duration={0.6} delay={0.1}>
                <span
                  className={item.current ? 'tl-dot is-current' : 'tl-dot'}
                />
              </Reveal>

              <Reveal className="tl-period" y={18} delay={index * 0.05}>
                <span className="mono">{item.period}</span>
                {badge && <span className="tl-now mono">{badge}</span>}
              </Reveal>

              <div className="tl-content">
                <Reveal className="tl-head" y={22} delay={0.05 + index * 0.05}>
                  {item.logo && (
                    <img
                      className="tl-logo"
                      src={item.logo}
                      alt=""
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="tl-head-text">
                    <h3 className="tl-role">{item.role}</h3>
                    <p className="tl-company">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="tl-company-link link-sweep"
                          data-cursor="hover"
                        >
                          {item.company}
                          <ArrowUpRight size={14} strokeWidth={1.8} />
                        </a>
                      ) : (
                        item.company
                      )}
                    </p>
                  </div>
                </Reveal>

                <Reveal y={20} delay={0.12 + index * 0.05}>
                  <p className="tl-summary">{emphasize(item.summary)}</p>
                </Reveal>

                <ul className="tl-highlights">
                  {item.highlights.map((highlight, i) => (
                    <Reveal
                      as="li"
                      key={highlight}
                      y={16}
                      delay={0.18 + i * 0.05}
                      amount={0.4}
                    >
                      <span className="tl-bullet" aria-hidden="true" />
                      <span>{emphasize(highlight)}</span>
                    </Reveal>
                  ))}
                </ul>

                <Reveal className="tag-row" y={16} delay={0.2}>
                  {item.stack.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="shell">
      <TimelineList items={experience} />

      <div className="edu">
        <Reveal className="edu-head" y={16}>
          <GraduationCap size={17} strokeWidth={1.6} />
          <span className="mono">Formación</span>
        </Reveal>

        <TimelineList items={education} />
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import Reveal from '../Reveal';
import { education, experience } from '../../data/profile';
import './timeline.css';

export default function Timeline() {
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
    <div className="shell">
      <div className="tl" ref={trackRef}>
        <div className="tl-rail" aria-hidden="true">
          <motion.span className="tl-rail-fill" style={{ scaleY }} />
        </div>

        <ol className="tl-list">
          {experience.map((job, index) => (
            <li className="tl-item" key={job.id}>
              <Reveal className="tl-marker" y={0} duration={0.6} delay={0.1}>
                <span className={job.current ? 'tl-dot is-current' : 'tl-dot'} />
              </Reveal>

              <Reveal className="tl-period" y={18} delay={index * 0.05}>
                <span className="mono">{job.period}</span>
                {job.current && (
                  <span className="tl-now mono">Actual</span>
                )}
              </Reveal>

              <div className="tl-content">
                <Reveal y={22} delay={0.05 + index * 0.05}>
                  <h3 className="tl-role">{job.role}</h3>
                  <p className="tl-company">{job.company}</p>
                </Reveal>

                <Reveal y={20} delay={0.12 + index * 0.05}>
                  <p className="tl-summary">{job.summary}</p>
                </Reveal>

                <ul className="tl-highlights">
                  {job.highlights.map((highlight, i) => (
                    <Reveal
                      as="li"
                      key={highlight}
                      y={16}
                      delay={0.18 + i * 0.05}
                      amount={0.4}
                    >
                      <span className="tl-bullet" aria-hidden="true" />
                      {highlight}
                    </Reveal>
                  ))}
                </ul>

                <Reveal className="tag-row" y={16} delay={0.2}>
                  {job.stack.map(tech => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="edu">
        <Reveal className="edu-head" y={16}>
          <GraduationCap size={17} strokeWidth={1.6} />
          <span className="mono">Formación</span>
        </Reveal>

        <ul className="edu-list">
          {education.map((item, index) => (
            <Reveal
              as="li"
              className="edu-item"
              key={item.id}
              y={20}
              delay={index * 0.07}
            >
              <div className="edu-main">
                <h3 className="edu-title">{item.title}</h3>
                <p className="edu-school">{item.school}</p>
              </div>
              <div className="edu-meta">
                <span className="mono edu-period">{item.period}</span>
                {item.note && <span className="mono edu-note">{item.note}</span>}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

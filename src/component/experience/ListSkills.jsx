import Reveal from '../Reveal';
import Marquee from '../Marquee';
import { stack, techLogos } from '../../data/profile';
import './skill.css';

export default function ListSkills() {
  return (
    <>
      <div className="shell stack">
        <div className="stack-aside">
          <Reveal y={16}>
            <p className="stack-note">
              Trabajo cómodo en todo el ciclo: modelar los datos, escribir la API,
              construir la interfaz y dejarlo andando en producción.
            </p>
          </Reveal>
        </div>

        <ul className="stack-list">
          {stack.map((group, index) => (
            <Reveal
              as="li"
              className="stack-group"
              key={group.id}
              y={22}
              delay={index * 0.05}
              amount={0.3}
            >
              <div className="stack-group-head">
                <span className="mono stack-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="stack-label">{group.label}</h3>
              </div>

              <div className="stack-items">
                {group.items.map(item => (
                  <span className="stack-item" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="logos">
        <Marquee speed={1.8}>
          {techLogos.map(logo => (
            <span className="logo-item" key={logo.name} title={logo.name}>
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                decoding="async"
              />
              <span className="mono logo-name">{logo.name}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </>
  );
}

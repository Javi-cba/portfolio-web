import Reveal from '../Reveal';
import { capabilities, profile } from '../../data/profile';
import './about.css';

export default function Capabilities() {
  return (
    <div className="shell caps">
      <div className="caps-aside">
        <Reveal y={16}>
          <span className="mono caps-eyebrow">En qué ayudo</span>
        </Reveal>
        <Reveal y={20} delay={0.08}>
          <p className="caps-objective">{profile.objective}</p>
        </Reveal>
      </div>

      <ul className="caps-list">
        {capabilities.map((capability, index) => (
          <Reveal
            as="li"
            className="caps-item"
            key={capability.id}
            y={24}
            delay={index * 0.08}
          >
            <span className="mono caps-index">
              0{index + 1}
            </span>

            <div className="caps-body">
              <h3 className="caps-title">{capability.title}</h3>
              <p className="caps-text">{capability.description}</p>
              <div className="tag-row caps-tags">
                {capability.tags.map(tag => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

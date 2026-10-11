import Reveal from '../Reveal';
import TechTicker from '../TechTicker';
import { stack } from '../../data/profile';
import './skill.css';

export default function ListSkills() {
  return (
    <>
      <div className="shell stack">
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

      <TechTicker className="stack-ticker" />
    </>
  );
}

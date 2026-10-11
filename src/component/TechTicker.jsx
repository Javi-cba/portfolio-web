import clsx from 'clsx';
import Marquee from './Marquee';
import { techLogos } from '../data/techLogos';
import './TechTicker.css';

/** Ticker infinito con los logos del stack principal. */
export default function TechTicker({ className }) {
  return (
    <div className={clsx('tech-ticker', className)}>
      <Marquee speed={1.3} pauseOnHover>
        {techLogos.map(logo => (
          <span className="logo-item" key={logo.name} title={logo.name}>
            <svg
              className="logo-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              {logo.icon}
            </svg>
            <span className="mono logo-name">{logo.name}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

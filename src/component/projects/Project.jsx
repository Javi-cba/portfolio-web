import { ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal';
import { GithubIcon } from '../icons';
import './projects.css';

export default function Project({
  name,
  description,
  tecnology,
  urlProject,
  urlRepo,
  urlImg,
  inDevelopment,
  onOpen,
}) {
  const topics = Array.isArray(tecnology) ? tecnology.filter(Boolean) : [];

  const detail = (
    <div className="work-expand-inner">
      {urlImg && (
        <span className="work-shot">
          {/* decoding async: son capturas grandes y decodificarlas en el hilo
              principal producía frames de cientos de ms al llegar la sección. */}
          <img
            src={urlImg}
            alt={`Vista de ${name}`}
            loading="lazy"
            decoding="async"
          />
        </span>
      )}

      <div className="work-detail">
        {description && <p className="work-desc">{description}</p>}

        {topics.length > 0 && (
          <div className="tag-row work-tags">
            {topics.slice(0, 6).map(topic => (
              <span className="tag" key={topic}>
                {topic}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          className="work-cta mono"
          onClick={onOpen}
          data-cursor="hover"
        >
          Ver documentación
          <ArrowUpRight size={14} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );

  return (
    <Reveal as="li" className="work" y={26} amount={0.25}>
      <div className="work-row">

        <h3 className="work-title display">
          <button
            type="button"
            className="work-open"
            onClick={onOpen}
            data-cursor="label"
            data-cursor-label="Ver"
          >
            <span className="work-title-mask">
              <span className="work-title-inner">
                <span className="work-title-line">{name}</span>
                <span className="work-title-line" aria-hidden="true">
                  {name}
                </span>
              </span>
            </span>
          </button>
        </h3>

        <div className="work-meta">
          {inDevelopment && (
            <span className="mono work-wip">
              <span className="work-wip-dot" aria-hidden="true" />
              En desarrollo
            </span>
          )}
        </div>

        <div className="work-actions">
          {urlRepo && (
            <a
              href={urlRepo}
              target="_blank"
              rel="noreferrer"
              className="work-icon"
              aria-label={`Ver el repositorio de ${name} en GitHub`}
              data-cursor="hover"
            >
              <GithubIcon size={15} />
            </a>
          )}
          {urlProject && (
            <a
              href={urlProject}
              target="_blank"
              rel="noreferrer"
              className="work-live mono"
              aria-label={`Ver ${name} en vivo`}
              data-cursor="hover"
            >
              <span className="work-live-dot" aria-hidden="true" />
              Ver en vivo
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          )}
        </div>
      </div>

      {/* Siempre desplegado: imagen, descripción y tags a la vista. */}
      <div className="work-expand">{detail}</div>
    </Reveal>
  );
}

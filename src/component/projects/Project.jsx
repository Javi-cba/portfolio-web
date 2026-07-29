import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import Reveal from '../Reveal';
import { GithubIcon } from '../icons';
import './projects.css';

const EASE = [0.16, 1, 0.3, 1];

/** Muestra el lenguaje principal y un topic, que es lo que cabe en la fila. */
function primaryTech(tecnology) {
  if (!Array.isArray(tecnology)) return '';
  return tecnology.filter(Boolean).slice(0, 2).join(' / ');
}

export default function Project({
  index = 0,
  name,
  description,
  tecnology,
  urlProject,
  urlRepo,
  urlImg,
  updatedAt,
  isActive,
  isDimmed,
  canHover,
  onHover,
  onOpen,
}) {
  const reduce = useReducedMotion();
  const year = updatedAt ? new Date(updatedAt).getFullYear() : null;
  const topics = Array.isArray(tecnology) ? tecnology.filter(Boolean) : [];

  // Sin hover (touch) la fila va siempre desplegada: no hay forma de abrirla.
  const expanded = canHover ? isActive : true;

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
    <Reveal
      as="li"
      className={clsx('work', isActive && 'is-active', isDimmed && 'is-dimmed')}
      y={26}
      amount={0.25}
      onPointerEnter={onHover}
    >
      <div className="work-row">
        <span className="mono work-index">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className="work-title display">
          <button
            type="button"
            className="work-open"
            onClick={onOpen}
            onFocus={onHover}
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

        <span className="mono work-tech">{primaryTech(tecnology)}</span>
        {year && <span className="mono work-year">{year}</span>}

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
              className="work-icon"
              aria-label={`Abrir el sitio de ${name}`}
              data-cursor="hover"
            >
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </a>
          )}
        </div>
      </div>

      {canHover && !reduce ? (
        <motion.div
          className="work-expand"
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{
            height: { duration: 0.55, ease: EASE },
            opacity: { duration: expanded ? 0.4 : 0.2, delay: expanded ? 0.1 : 0 },
          }}
        >
          {detail}
        </motion.div>
      ) : (
        <div className="work-expand is-static">{detail}</div>
      )}
    </Reveal>
  );
}

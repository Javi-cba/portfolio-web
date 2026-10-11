import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SubTittle from '../SubTittle';
import { GithubIcon } from '../icons';
import Reveal from '../Reveal';
import Project from './Project';
import { getProjects } from '../../services/gitHubServ';
import { refreshScrollTriggers } from '../../hooks/useSmoothScroll';
import { profile } from '../../data/profile';
import './projects.css';

// El lector de README arrastra react-markdown: lo cargamos al abrir el modal.
const Readme = lazy(() => import('./Readme'));

const SKELETON_ROWS = 4;

export default function ListProjects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');
  const [detail, setDetail] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        const resp = await getProjects();
        if (cancelled) return;
        setProjects(Array.isArray(resp) ? resp : []);
        setStatus('ready');
      } catch (error) {
        console.error(`Error Fetch getProjects: ${error}`);
        if (!cancelled) setStatus('error');
      }
    };

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  // Al crecer el listado cambia la altura del documento: recalculamos triggers.
  useEffect(() => {
    if (status === 'ready') refreshScrollTriggers();
  }, [status, projects.length]);

  const openDetail = item => {
    setDetail(item);
    setDetailOpen(true);
  };

  return (
    <div className="shell">
      <SubTittle text="Proyectos" index="04">
      </SubTittle>

      {status === 'error' && (
        <Reveal className="works-error" y={16}>
          <p>No pude cargar los repositorios en este momento.</p>
          <a
            href={profile.socials[0].url}
            target="_blank"
            rel="noreferrer"
            className="btn"
            data-cursor="hover"
          >
            <GithubIcon size={15} />
            Ver en GitHub
          </a>
        </Reveal>
      )}

      {status === 'loading' && (
        <ul className="works" aria-hidden="true">
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <li className="work work--skeleton" key={i}>
              <span className="skeleton skeleton-title" />
              <span className="skeleton skeleton-tech" />
            </li>
          ))}
        </ul>
      )}

      {status === 'ready' && projects.length === 0 && (
        <Reveal className="works-error" y={16}>
          <p>Todavía no hay repositorios con topics para mostrar.</p>
        </Reveal>
      )}

      {status === 'ready' && projects.length > 0 && (
        <ul className="works">
          {projects.map(item => (
            <Project
              key={item.id ?? item.name}
              name={item.name}
              description={item.description}
              tecnology={item.topics}
              urlProject={item.homepage}
              urlRepo={item.html_url}
              urlImg={item.urlImg}
              inDevelopment={item.inDevelopment}
              onOpen={() => openDetail(item)}
            />
          ))}
        </ul>
      )}

      <Reveal className="works-footer" y={18}>
        <span className="mono works-footer-note">
          {status === 'ready'
            ? `${projects.length} proyecto${projects.length === 1 ? '' : 's'} publicado${
                projects.length === 1 ? '' : 's'
              }`
            : 'Cargando repositorios…'}
        </span>
        <a
          href={profile.socials[0].url}
          target="_blank"
          rel="noreferrer"
          className="works-footer-link link-sweep mono"
          data-cursor="hover"
        >
          Ver todos en GitHub
          <ArrowUpRight size={14} strokeWidth={1.8} />
        </a>
      </Reveal>

      {/* `detail` queda montado al cerrar para que corra la animación de salida. */}
      {detail && (
        <Suspense fallback={null}>
          <Readme
            project={detail}
            open={detailOpen}
            onClose={() => setDetailOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

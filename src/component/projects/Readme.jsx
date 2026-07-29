import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowUpRight, X } from 'lucide-react';
import { GithubIcon } from '../icons';
import { lockScroll } from '../../hooks/useSmoothScroll';
import './projects.css';

const EASE = [0.16, 1, 0.3, 1];

/*
 * Rebote de tope: un único golpe contra el límite del scroll. El contenido se
 * despega, cruza el cero una sola vez y se asienta — con más rebotes
 * encadenados se sentía como dos animaciones seguidas.
 */
const BOUNCE_DISTANCE = 74;
const BOUNCE_KEYFRAMES = [0, 1, -0.06, 0];
const BOUNCE_TIMES = [0, 0.22, 0.66, 1];
const BOUNCE_MS = 620;
const SQUASH_KEYFRAMES = [1, 0.972, 1.004, 1];
const SQUASH_TIMES = [0, 0.22, 0.66, 1];

export default function Readme({ project, open, onClose }) {
  const reduce = useReducedMotion();
  const bodyRef = useRef(null);
  const bouncing = useRef(false);
  const edgeTimer = useRef(null);
  const [edge, setEdge] = useState(null);

  const bounceY = useMotionValue(0);
  const squash = useMotionValue(1);
  const origin = useMotionValue('center');

  // Lenis sigue corriendo detrás del modal: hay que frenarlo a mano.
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => () => clearTimeout(edgeTimer.current), []);

  const handleWheel = event => {
    const el = bodyRef.current;
    if (!el || reduce) return;

    const atTop = el.scrollTop <= 0;
    const atBottom =
      Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1;

    const overTop = atTop && event.deltaY < 0;
    const overBottom = atBottom && event.deltaY > 0;
    if (!overTop && !overBottom) return;

    // Marca el borde alcanzado mientras el usuario sigue empujando.
    setEdge(overTop ? 'top' : 'bottom');
    clearTimeout(edgeTimer.current);
    edgeTimer.current = setTimeout(() => setEdge(null), BOUNCE_MS);

    // Un rebote por choque: si ya está rebotando no lo reiniciamos.
    if (bouncing.current) return;
    bouncing.current = true;

    const direction = overTop ? 1 : -1;
    // El squash se comprime contra el borde contra el que chocó.
    origin.set(overTop ? 'center top' : 'center bottom');

    animate(
      bounceY,
      BOUNCE_KEYFRAMES.map(k => k * direction * BOUNCE_DISTANCE),
      {
        duration: BOUNCE_MS / 1000,
        times: BOUNCE_TIMES,
        ease: ['easeOut', 'easeInOut', 'easeOut'],
      }
    );

    animate(squash, SQUASH_KEYFRAMES, {
      duration: BOUNCE_MS / 1000,
      times: SQUASH_TIMES,
      ease: 'easeInOut',
    }).then(() => {
      bouncing.current = false;
    });
  };

  const handleOpenChange = next => {
    if (!next) onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal">
          {project && (
            <>
              <header className="modal-head">
                <div className="modal-head-text">
                  <Dialog.Title className="modal-title display">
                    {project.name}
                  </Dialog.Title>
                  <Dialog.Description className="modal-desc">
                    {project.description || 'Repositorio público en GitHub.'}
                  </Dialog.Description>
                </div>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="modal-close"
                    aria-label="Cerrar"
                    data-cursor="hover"
                  >
                    <X size={17} strokeWidth={1.7} />
                  </button>
                </Dialog.Close>
              </header>

              {/*
                `data-lenis-prevent`: Lenis, cuando está detenido, hace
                preventDefault de todo wheel y bloquea el scroll de este panel.
                Con el atributo lo ignora y el scroll nativo vuelve a andar.
              */}
              <div
                className="modal-body"
                ref={bodyRef}
                data-lenis-prevent
                data-edge={edge || undefined}
                onWheel={handleWheel}
              >
                <motion.div
                  className="modal-body-inner"
                  style={
                    reduce
                      ? undefined
                      : { y: bounceY, scaleY: squash, transformOrigin: origin }
                  }
                >
                {/* La imagen "se inserta": el marco se abre desde arriba
                    mientras la foto baja y se asienta en su lugar. */}
                {project.urlImg && (
                  <motion.div
                    className="modal-cover"
                    initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
                    animate={reduce ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
                  >
                    <motion.img
                      src={project.urlImg}
                      alt={project.name}
                      decoding="async"
                      initial={reduce ? false : { y: '-18%', scale: 1.14 }}
                      animate={reduce ? undefined : { y: '0%', scale: 1 }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.18 }}
                    />
                  </motion.div>
                )}

                {Array.isArray(project.topics) && project.topics.length > 0 && (
                  <div className="tag-row modal-tags">
                    {project.topics.filter(Boolean).map(topic => (
                      <span className="tag" key={topic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="modal-links">
                  {project.html_url && (
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn"
                      data-cursor="hover"
                    >
                      <GithubIcon size={15} />
                      Repositorio
                    </a>
                  )}
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--solid"
                      data-cursor="hover"
                    >
                      Ver en vivo
                      <ArrowUpRight size={15} strokeWidth={1.8} />
                    </a>
                  )}
                </div>

                <div className="md">
                  {project.readme ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: props => (
                          <a {...props} target="_blank" rel="noreferrer" />
                        ),
                      }}
                    >
                      {project.readme}
                    </ReactMarkdown>
                  ) : (
                    <p className="modal-empty">
                      Este repositorio todavía no tiene README.
                    </p>
                  )}
                </div>
                </motion.div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

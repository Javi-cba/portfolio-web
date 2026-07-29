import { motion, useReducedMotion } from 'motion/react';
import clsx from 'clsx';
import Reveal, { AnimatedText } from './Reveal';

/**
 * Encabezado de sección: índice + línea + rótulo, y debajo el título grande.
 * `text` se mantiene como prop principal por compatibilidad con el resto del sitio.
 */
export default function SubTittle({
  text,
  index,
  eyebrow,
  children,
  className,
}) {
  const reduce = useReducedMotion();

  return (
    <header className={clsx('section-head', className)}>
      <Reveal className="section-head-meta" y={14} duration={0.7}>
        {index && <span className="mono section-index">{index}</span>}
        {reduce ? (
          <span className="section-rule" />
        ) : (
          <motion.span
            className="section-rule"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
        )}
        {(eyebrow || text) && (
          <span className="mono section-eyebrow">{eyebrow || text}</span>
        )}
      </Reveal>

      <AnimatedText
        as="h2"
        text={text}
        className="display section-title"
        stagger={0.022}
      />

      {children && (
        <Reveal className="section-lede lede" y={18} delay={0.12}>
          {children}
        </Reveal>
      )}
    </header>
  );
}

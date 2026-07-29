import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import clsx from 'clsx';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Wrapper de aparición al entrar en viewport: sube + funde.
 */
export default function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  y = 26,
  duration = 0.9,
  once = true,
  amount = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Texto que entra letra por letra desde abajo, cada una detrás de su máscara.
 * El texto plano queda disponible para lectores de pantalla.
 */
export function AnimatedText({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.026,
  duration = 0.85,
  once = true,
  amount = 0.4,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  const reduce = useReducedMotion();
  const words = String(text).split(' ');

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  let charIndex = -1;

  return (
    <Tag ref={ref} className={clsx('anim-text', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span className="anim-word" key={`${word}-${wi}`}>
            {Array.from(word).map((char, ci) => {
              charIndex += 1;
              return (
                <span className="anim-mask" key={`${char}-${ci}`}>
                  <motion.span
                    className="anim-char"
                    initial={{ y: '108%' }}
                    animate={inView ? { y: '0%' } : { y: '108%' }}
                    transition={{
                      duration,
                      delay: delay + charIndex * stagger,
                      ease: EASE,
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/**
 * Aparición por líneas: cada hijo sube detrás de su máscara, en cascada.
 */
export function RevealLines({ children, className, delay = 0, stagger = 0.09 }) {
  const reduce = useReducedMotion();
  const items = Array.isArray(children) ? children : [children];

  return (
    <span className={className}>
      {items.map((child, i) => (
        <span className="anim-line-mask" key={i}>
          {reduce ? (
            <span className="anim-line">{child}</span>
          ) : (
            <motion.span
              className="anim-line"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.95,
                delay: delay + i * stagger,
                ease: EASE,
              }}
            >
              {child}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

/**
 * Número que cuenta hasta su valor al entrar en viewport.
 */
export function Counter({ value = 0, duration = 1.7, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const text = useTransform(count, latest => latest.toFixed(decimals));

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      count.set(value);
      return undefined;
    }
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value, duration, reduce, count]);

  return (
    <span ref={ref}>
      <motion.span>{text}</motion.span>
    </span>
  );
}

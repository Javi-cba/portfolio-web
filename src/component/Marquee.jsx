import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import clsx from 'clsx';

/*
 * 3 copias es el mínimo seguro: el loop es continuo mientras
 * (ancho del track − ancho de una copia) ≥ ancho del viewport. Bajar de 4 a 3
 * recorta un 25% de los nodos que se pintan dentro de la capa en movimiento.
 */
const COPIES = 3;

function wrapValue(min, max, value) {
  const range = max - min;
  return (((value - min) % range) + range) % range + min;
}

/**
 * Ticker infinito que acelera y cambia de sentido con la velocidad del scroll.
 * `speed` está en % del track por segundo.
 */
export default function Marquee({
  children,
  speed = 2.2,
  reverse = false,
  className,
  itemClassName,
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(reverse ? -1 : 1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, value =>
    `${wrapValue(-100 / COPIES, 0, value)}%`
  );

  useAnimationFrame((_, delta) => {
    if (reduce) return;

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = reverse ? 1 : -1;
    else if (factor > 0) direction.current = reverse ? -1 : 1;

    let moveBy = direction.current * speed * (delta / 1000);
    moveBy += moveBy * Math.abs(factor);

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={clsx('marquee', className)}>
      <motion.div className="marquee-track" style={reduce ? undefined : { x }}>
        {Array.from({ length: COPIES }).map((_, i) => (
          <div
            className={clsx('marquee-group', itemClassName)}
            key={i}
            aria-hidden={i > 0 ? 'true' : undefined}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/**
 * Efecto magnético: el elemento se acerca al cursor mientras lo sobrevolás
 * y vuelve a su lugar con un rebote suave al salir.
 */
export default function Magnetic({
  children,
  strength = 0.32,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = event => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { prefersReducedMotion } from '../hooks/useSmoothScroll';

/**
 * Anillo que sigue al cursor con retardo. Reacciona a los elementos que
 * declaran `data-cursor` (y opcionalmente `data-cursor-label`), así cada
 * sección decide el estado sin acoplarse a este componente.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const handleMove = event => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
    };

    const handleOver = event => {
      const target = event.target?.closest?.('[data-cursor]');
      if (target) {
        setVariant(target.dataset.cursor || 'hover');
        setLabel(target.dataset.cursorLabel || '');
      } else {
        setVariant('default');
        setLabel('');
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  const size = variant === 'label' ? 88 : variant === 'hover' ? 52 : 26;

  return (
    <motion.div
      className="cursor-ring"
      data-variant={variant}
      style={{ x, y }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {variant === 'label' && label && (
          <motion.span
            className="cursor-label"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.22 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

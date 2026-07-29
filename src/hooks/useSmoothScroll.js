import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Instancia única de Lenis. La guardamos a nivel de módulo para que el navbar,
 * el footer y los modales puedan controlar el scroll sin pasar props ni context.
 */
let lenis = null;

const NAV_OFFSET = 88;

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Scroll suave hacia una sección (acepta selector, id o elemento). */
export function scrollToSection(target, options = {}) {
  if (typeof window === 'undefined') return;

  const el =
    typeof target === 'string'
      ? document.querySelector(target.startsWith('#') ? target : `#${target}`)
      : target;

  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.25, ...options });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Congela / reanuda el scroll (menú mobile y modales). */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
}

/** Recalcula los ScrollTriggers cuando cambia la altura del documento. */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export default function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const instance = new Lenis({
      duration: 1.05,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenis = instance;

    // Handle para inspeccionar el scroll desde la consola; se elimina en build.
    if (import.meta.env.DEV) window.__lenis = instance;

    // Lenis maneja el scroll → ScrollTrigger tiene que actualizarse con él.
    instance.on('scroll', ScrollTrigger.update);

    const tick = time => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

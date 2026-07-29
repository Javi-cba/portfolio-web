import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './useSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax vertical atado al scroll (scrub) sobre un elemento.
 * `distance` en px: positivo baja, negativo sube.
 */
export default function useParallax(ref, { distance = 90, from = null } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const tween = gsap.fromTo(
      el,
      { y: from ?? -distance / 2 },
      {
        y: distance / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'y' });
    };
  }, [ref, distance, from]);
}

/**
 * Desplazamiento horizontal atado al scroll, para los wordmarks gigantes
 * de fondo (el efecto "el texto pasa mientras scrolleás").
 */
export function useHorizontalDrift(ref, { distance = 200 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const tween = gsap.fromTo(
      el,
      { x: 0 },
      {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'x' });
    };
  }, [ref, distance]);
}

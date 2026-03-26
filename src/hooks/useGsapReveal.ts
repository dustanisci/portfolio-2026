import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  stagger?: number;
};

/**
 * Animates children of the returned ref using GSAP ScrollTrigger.
 * Pass a selector string to target specific children (e.g. '.gsap-item').
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  selector = '.gsap-item',
  options: RevealOptions = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const {
        from = { opacity: 0, y: 50 },
        to = { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        stagger = 0.12,
      } = options;

      gsap.fromTo(
        selector,
        from,
        {
          ...to,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

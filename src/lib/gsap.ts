import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);

export { gsap, ScrollTrigger, ScrollToPlugin, Flip };

/** Scoped gsap.context that auto-reverts on cleanup. */
export function useGsap(
  cb: (self: gsap.Context) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(cb, scope as RefObject<HTMLElement>);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function scrollToId(id: string) {
  gsap.to(window, {
    duration: 1.2,
    ease: "power3.inOut",
    scrollTo: { y: `#${id}`, offsetY: 70 },
  });
}

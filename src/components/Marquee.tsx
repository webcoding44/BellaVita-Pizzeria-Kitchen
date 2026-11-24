import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap } from "../lib/gsap";

const words = ["Wood-Fired", "Hand-Stretched Dough", "San Marzano Tomatoes", "Fresh Basil", "Made with Love", "Buon Appetito"];

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const tween = gsap.to("[data-track]", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 300, 6);
        gsap.to(tween, { timeScale: 1 + v, duration: 0.2, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.2 });
      },
    });
  }, root, []);

  const row = [...words, ...words];
  return (
    <div ref={root} className="relative z-20 overflow-hidden bg-brand py-3.5 text-white">
      <div data-track className="flex w-max items-center whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {row.map((w, i) => (
              <span key={i} className="flex items-center font-display text-lg italic tracking-wide">
                <span className="px-6">{w}</span>
                <span className="text-amber-300">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

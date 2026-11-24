import { useEffect, useRef } from "react";
import { gsap, useGsap } from "../lib/gsap";
import { Logo } from "./ui";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useGsap(() => {
    const num = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onDone();
      },
    });
    tl.from("[data-pl-logo]", { scale: 0.4, autoAlpha: 0, rotate: -90, duration: 0.9, ease: "back.out(1.7)" })
      .from("[data-pl-text]", { y: 24, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .to(num, {
        v: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counter.current) counter.current.textContent = String(Math.round(num.v)).padStart(2, "0");
        },
      }, 0.2)
      .to("[data-pl-bar]", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0.2)
      .to("[data-pl-content]", { y: -40, autoAlpha: 0, duration: 0.5, ease: "power2.in" })
      .to("[data-pl-panel]", { yPercent: -100, duration: 0.9, ease: "expo.inOut", stagger: { each: 0.12, from: "end" } }, "-=0.1")
      .set(root.current, { display: "none" });
  }, root, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div data-pl-panel className="absolute inset-0 bg-brand" />
      <div data-pl-panel className="absolute inset-0 bg-forest" style={{ clipPath: "inset(0)" }} />
      <div data-pl-panel className="absolute inset-0 bg-cream" />
      <div data-pl-content className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6">
        <div data-pl-logo>
          <Logo className="scale-125" />
        </div>
        <p data-pl-text className="font-script text-2xl text-brand">Good Food. Good People. Always a Slice Ahead.</p>
        <div className="mt-2 h-[3px] w-56 overflow-hidden rounded-full bg-ink/10">
          <div data-pl-bar className="h-full origin-left scale-x-0 bg-brand" />
        </div>
        <span ref={counter} className="font-display text-sm tracking-widest text-ink/60">00</span>
      </div>
    </div>
  );
}

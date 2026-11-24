import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "../lib/gsap";
import { img } from "../data";

export default function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(el, { display: "flex" });
      const tl = gsap.timeline();
      tl.fromTo("[data-m-bg]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
        .fromTo("[data-m-card]", { y: 100, scale: 0.85, autoAlpha: 0, rotate: 2 }, { y: 0, scale: 1, autoAlpha: 1, rotate: 0, duration: 0.8, ease: "expo.out" }, 0.1)
        .fromTo("[data-m-img]", { scale: 1.4 }, { scale: 1, duration: 2, ease: "power3.out" }, 0.1)
        .fromTo("[data-m-t]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" }, 0.5);
    } else if (getComputedStyle(el).display !== "none") {
      document.body.style.overflow = "";
      gsap.timeline({ onComplete: () => { gsap.set(el, { display: "none" }); } })
        .to("[data-m-card]", { y: 60, scale: 0.9, autoAlpha: 0, duration: 0.4, ease: "power3.in" })
        .to("[data-m-bg]", { autoAlpha: 0, duration: 0.3 }, "-=0.2");
    }
  }, [open]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  return (
    <div ref={root} style={{ display: "none" }} className="fixed inset-0 z-[90] items-center justify-center p-4">
      <div data-m-bg onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div data-m-card className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl bg-cream shadow-2xl md:grid-cols-2">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 transition hover:rotate-90 hover:bg-brand hover:text-white">
          <X className="h-4 w-4" />
        </button>
        <div className="relative min-h-[240px] overflow-hidden">
          <img data-m-img src={img.restaurant} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="p-8 sm:p-10">
          <p data-m-t className="eyebrow text-brand">Since 2014</p>
          <h3 data-m-t className="mt-3 font-display text-3xl font-bold leading-tight">From a Neapolitan oven to your table</h3>
          <p data-m-t className="mt-4 text-sm leading-relaxed text-ink/70">
            BellaVita began with one brick oven, a family recipe and a simple promise — dough rested for 48 hours, tomatoes from the volcanic soils of Campania and fire that never cheats. Today, we still hand-stretch every pizza and serve every plate like it's Sunday in Italy.
          </p>
          <p data-m-t className="mt-5 font-script text-2xl text-brand">— The BellaVita Family</p>
        </div>
      </div>
    </div>
  );
}

import { useCallback, useLayoutEffect, useRef } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { gsap, Flip, ScrollTrigger, useGsap } from "../lib/gsap";
import { dishes, tabs, type Dish } from "../data";
import { SectionTitle } from "./ui";
import { cn } from "../utils/cn";

type Props = { cat: string; setCat: (c: string) => void; onAdd: (d: Dish) => void };

export default function Signature({ cat, setCat, onAdd }: Props) {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const underline = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const flipState = useRef<Flip.FlipState | null>(null);
  const prev = useRef(cat);

  useGsap(() => {
    gsap.from("[data-title]", { yPercent: 110, duration: 1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-tab]", { y: 20, autoAlpha: 0, stagger: 0.05, duration: 0.6, scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-dish]", {
      y: 80, autoAlpha: 0, rotateX: -15, transformPerspective: 800, duration: 0.9, stagger: { each: 0.07, grid: "auto", from: "start" }, ease: "power3.out",
      scrollTrigger: { trigger: grid.current, start: "top 88%" },
      clearProps: "transform,opacity,visibility",
    });
  }, root, []);

  const select = (t: string) => {
    if (t === cat) return;
    flipState.current = Flip.getState("[data-dish]");
    setCat(t);
  };

  const placeUnderline = useCallback((dur: number) => {
    const btn = tabRefs.current[cat];
    if (btn && underline.current) gsap.to(underline.current, { x: btn.offsetLeft, width: btn.offsetWidth, duration: dur, ease: "power3.inOut", overwrite: true });
  }, [cat]);

  useLayoutEffect(() => {
    const onResize = () => placeUnderline(0);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [cat, placeUnderline]);

  // animate when category changes
  useLayoutEffect(() => {
    const changed = prev.current !== cat;
    prev.current = cat;
    placeUnderline(changed ? 0.5 : 0);
    if (!changed) return;
    if (flipState.current) {
      Flip.from(flipState.current, {
        duration: 0.8,
        ease: "power3.inOut",
        absolute: true,
        scale: true,
        stagger: 0.04,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.7, y: 40 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, delay: 0.25, stagger: 0.05, ease: "back.out(1.4)" }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.7, duration: 0.35, ease: "power2.in" }),
        onComplete: () => { ScrollTrigger.refresh(); },
      });
      flipState.current = null;
    } else {
      gsap.fromTo("[data-dish]:not(.hidden)", { autoAlpha: 0, y: 40, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.7, ease: "power3.out", clearProps: "transform" });
      ScrollTrigger.refresh();
    }
  }, [cat, placeUnderline]);

  const plus = (e: React.MouseEvent<HTMLButtonElement>, d: Dish) => {
    const el = e.currentTarget;
    gsap.fromTo(el, { rotate: 0, scale: 1 }, { rotate: 180, scale: 1.25, duration: 0.35, yoyo: true, repeat: 1, ease: "power2.out", onComplete: () => { gsap.set(el, { rotate: 0 }); } });
    const card = el.closest("[data-dish]")!;
    gsap.fromTo(card.querySelector("[data-flash]"), { autoAlpha: 0.9 }, { autoAlpha: 0, duration: 0.7 });
    onAdd(d);
  };

  return (
    <section id="signature" ref={root} className="bg-cream pb-16 pt-12">
      <div className="container-x">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle>Our Signature Dishes</SectionTitle>
          <div className="flex items-center gap-6">
            <div className="no-scrollbar relative flex gap-5 overflow-x-auto pb-2 text-[0.72rem] font-medium">
              {tabs.map((t) => (
                <button
                  key={t}
                  data-tab
                  ref={(el) => { tabRefs.current[t] = el; }}
                  onClick={() => select(t)}
                  className={cn("shrink-0 cursor-pointer whitespace-nowrap pb-1 transition-colors", cat === t ? "text-brand" : "text-ink/60 hover:text-ink")}
                >
                  {t}
                </button>
              ))}
              <span ref={underline} className="absolute bottom-1 left-0 h-[2px] w-0 bg-brand" />
            </div>
            <button onClick={() => select("All")} className="group hidden shrink-0 cursor-pointer items-center gap-1.5 text-xs font-semibold hover:text-brand md:flex">
              View All <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>

        <div ref={grid} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {dishes.map((d) => (
            <article
              key={d.id}
              data-dish
              className={cn("group relative overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/15", cat !== "All" && d.cat !== cat && "hidden")}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} className={cn("h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1", d.flip && "-scale-x-100 group-hover:-scale-x-110", d.zoom && "origin-[70%_40%]")} style={d.zoom ? { objectPosition: "70% 40%" } : undefined} />
                <span data-flash className="pointer-events-none absolute inset-0 bg-white opacity-0" />
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-brand opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">{d.cat}</span>
              </div>
              <div className="p-3">
                <h3 className="text-[0.8rem] font-semibold leading-tight">{d.name}</h3>
                <p className="mt-1 line-clamp-2 min-h-[2rem] text-[0.65rem] leading-snug text-ink/60">{d.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-base font-bold">₹{d.price}</span>
                  <button onClick={(e) => plus(e, d)} aria-label={`Add ${d.name}`} className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-ink/25 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

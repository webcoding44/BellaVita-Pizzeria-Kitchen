import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, scrollToId, useGsap } from "../lib/gsap";
import { categories } from "../data";
import { SectionTitle } from "./ui";

export default function ExploreMenu({ onPick }: { onPick: (c: string) => void }) {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    gsap.from("[data-title]", { yPercent: 110, duration: 1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-view]", { x: 30, autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-cat]", {
      y: 70, autoAlpha: 0, scale: 0.92, rotate: 2, duration: 0.9, stagger: 0.09, ease: "power3.out",
      scrollTrigger: { trigger: "[data-cat-grid]", start: "top 88%" },
    });
    gsap.utils.toArray<HTMLElement>("[data-cat]").forEach((card, i) => {
      gsap.to(card.querySelector("img"), { yPercent: i % 2 ? -6 : 6, ease: "none", scrollTrigger: { trigger: card, scrub: true, start: "top bottom", end: "bottom top" } });
    });
  }, root, []);

  return (
    <section id="menu" ref={root} className="bg-cream pb-6 pt-14">
      <div className="container-x">
        <div className="mb-6 flex items-end justify-between">
          <SectionTitle>Explore Our Menu</SectionTitle>
          <button data-view onClick={() => scrollToId("signature")} className="group flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-ink/80 hover:text-brand">
            View Full Menu <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>
        <div data-cat-grid className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <button
              key={c.name}
              data-cat
              onClick={() => { onPick(c.name); scrollToId("signature"); }}
              className="group cursor-pointer overflow-hidden rounded-xl border border-black/5 bg-white text-left shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/15"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.name} className="relative -top-[9%] h-[118%] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex items-center justify-between px-3 py-3 text-sm font-semibold">
                {c.name}
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

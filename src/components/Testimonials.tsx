import { useRef } from "react";
import { Star } from "lucide-react";
import { gsap, useGsap } from "../lib/gsap";
import { reviews } from "../data";
import { GoogleG, SectionTitle } from "./ui";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    gsap.from("[data-title]", { yPercent: 110, duration: 1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-view]", { x: 30, autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-review]", {
      y: 80, autoAlpha: 0, rotate: (i) => (i - 1) * 3, duration: 1, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: "[data-review-grid]", start: "top 85%" },
    });
    gsap.from("[data-star]", { scale: 0, rotate: -90, duration: 0.5, stagger: 0.05, ease: "back.out(3)", delay: 0.4, scrollTrigger: { trigger: "[data-review-grid]", start: "top 80%" } });
    gsap.from("[data-quote]", { scale: 0, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: "elastic.out(1,0.5)", delay: 0.3, scrollTrigger: { trigger: "[data-review-grid]", start: "top 85%" } });
  }, root, []);

  return (
    <section ref={root} className="bg-cream pb-14 pt-4">
      <div className="container-x">
        <div className="mb-5 flex items-end justify-between">
          <SectionTitle>What Our Guests Say</SectionTitle>
          <span data-view className="cursor-pointer text-xs font-semibold hover:text-brand">View All Reviews →</span>
        </div>
        <div data-review-grid className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} data-review className="group relative rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10">
              <span data-quote className="absolute -top-3 right-5 font-display text-6xl leading-none text-brand/15 transition-colors group-hover:text-brand/30">“</span>
              <blockquote className="min-h-[72px] text-[0.85rem] leading-relaxed text-ink/80">“{r.text}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-white" style={{ background: r.color }}>{r.initials}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} data-star className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <GoogleG className="h-5 w-5" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

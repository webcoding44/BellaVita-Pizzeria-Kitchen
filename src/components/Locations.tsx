import { useRef } from "react";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { gsap, useGsap } from "../lib/gsap";
import { locations } from "../data";
import { SectionTitle } from "./ui";
import { cn } from "../utils/cn";

export default function Locations() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    gsap.from("[data-title]", { yPercent: 110, duration: 1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-loc-sub]", { y: 20, autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 85%" } });
    gsap.from("[data-loc]", { y: 60, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "[data-loc-grid]", start: "top 85%" } });
    gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((p, i) => {
      gsap.to(p, { y: -6, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.2 });
    });
    gsap.to("[data-ping]", { scale: 2.6, autoAlpha: 0, duration: 1.8, repeat: -1, ease: "power1.out", stagger: 0.3 });
  }, root, []);

  return (
    <section id="locations" ref={root} className="bg-sand py-16">
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-2">
          <p className="eyebrow text-brand">Find Us</p>
          <SectionTitle>Our Locations</SectionTitle>
          <p data-loc-sub className="max-w-md text-sm text-ink/65">Pull up a chair at any of our kitchens across India — the oven is always lit.</p>
        </div>
        <div data-loc-grid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((l) => (
            <div key={l.city} data-loc className={cn("group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl", l.flagship ? "border-transparent bg-brand text-white hover:shadow-brand/30" : "border-black/5 bg-white hover:shadow-black/10")}>
              <div className="relative mb-5 inline-flex">
                <span data-ping className={cn("absolute inset-0 rounded-full", l.flagship ? "bg-white/40" : "bg-brand/30")} />
                <span data-pin className={cn("relative flex h-11 w-11 items-center justify-center rounded-full", l.flagship ? "bg-white text-brand" : "bg-brand text-white")}>
                  <MapPin className="h-5 w-5" />
                </span>
              </div>
              {l.flagship && <span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider">Flagship</span>}
              <h3 className="font-display text-2xl font-bold">{l.city}</h3>
              <p className={cn("mt-2 min-h-[40px] text-[0.8rem] leading-relaxed", l.flagship ? "text-white/80" : "text-ink/65")}>{l.address}</p>
              <div className={cn("mt-4 space-y-2 border-t pt-4 text-xs", l.flagship ? "border-white/20" : "border-black/10")}>
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {l.phone}</div>
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {l.hours}</div>
              </div>
              <span className={cn("mt-5 inline-flex items-center gap-1 text-xs font-semibold", l.flagship ? "text-white" : "text-brand")}>
                Get directions <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

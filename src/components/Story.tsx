import { useRef } from "react";
import { ArrowRight, Pizza, Users, Star, MapPin } from "lucide-react";
import { gsap, scrollToId, useGsap } from "../lib/gsap";
import { img, stats } from "../data";
import { Btn, Leaf } from "./ui";

const icons = [Pizza, Users, Star, MapPin];

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    const st = { trigger: root.current, start: "top 75%" };
    const tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } });
    tl.from("[data-story-eyebrow]", { y: 20, autoAlpha: 0, duration: 0.6 })
      .from("[data-story-line] > span", { yPercent: 115, duration: 1, stagger: 0.12, ease: "power4.out" }, "-=0.3")
      .from("[data-story-p]", { y: 30, autoAlpha: 0, duration: 0.8 }, "-=0.6")
      .from("[data-story-btn]", { y: 30, autoAlpha: 0, duration: 0.8 }, "-=0.5")
      .from("[data-story-stat]", { x: 50, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, "-=1")
      .from("[data-story-script]", { autoAlpha: 0, rotate: -10, y: 30, duration: 1 }, "-=0.6");

    gsap.fromTo("[data-story-img]", { clipPath: "inset(0 100% 0 0)", scale: 1.3 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.6, ease: "expo.out", scrollTrigger: st });
    gsap.fromTo("[data-story-img] img", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } });

    // neon flicker
    gsap.timeline({ repeat: -1, repeatDelay: 2.5 })
      .to("[data-neon]", { opacity: 0.35, duration: 0.05 })
      .to("[data-neon]", { opacity: 1, duration: 0.05 })
      .to("[data-neon]", { opacity: 0.5, duration: 0.07 })
      .to("[data-neon]", { opacity: 1, duration: 0.2 });

    // counters
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count!);
      const dec = parseInt(el.dataset.dec!);
      const o = { v: 0 };
      gsap.to(o, {
        v: end, duration: 2.2, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => { el.textContent = o.v.toFixed(dec); },
      });
    });
    gsap.to("[data-story-leaf]", { rotate: "+=8", y: -10, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 100%" });
  }, root, []);

  return (
    <section id="story" ref={root} className="relative overflow-hidden bg-sand">
      <div className="grid lg:grid-cols-[1.05fr_1fr_0.8fr]">
        <div className="relative z-10 px-6 py-14 lg:py-16 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:pr-6">
          <p data-story-eyebrow className="eyebrow mb-4 text-brand">Our Story</p>
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-[2.6rem]">
            <span data-story-line className="line-mask"><span>A Slice of Italy</span></span>
            <span data-story-line className="line-mask"><span>in Every Bite</span></span>
          </h2>
          <p data-story-p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-ink/75">
            At BellaVita, we bring the authentic taste of Italian cuisine to your table. Our wood-fired pizzas, handcrafted pastas and fresh ingredients are made with love, tradition and a passion for great food.
          </p>
          <span data-story-btn className="mt-7 inline-block">
            <Btn onClick={() => scrollToId("events")}>Discover Our Story <ArrowRight className="h-4 w-4" /></Btn>
          </span>
        </div>

        <div data-story-img className="relative min-h-[320px] overflow-hidden lg:min-h-full">
          <img src={img.restaurant} alt="BellaVita dining room" className="absolute -top-[10%] left-0 h-[120%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-sand via-transparent to-transparent max-lg:hidden" />
          <div data-neon className="neon absolute left-1/2 top-[22%] -translate-x-1/2 -rotate-6 text-center font-script text-5xl leading-none text-rose-100">
            Bella<br />Vita <span className="text-3xl">♡</span>
          </div>
        </div>

        <div className="relative bg-white/70 px-6 py-10 backdrop-blur lg:px-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-1 lg:gap-y-5">
            {stats.map((s, i) => {
              const Icon = icons[i];
              return (
                <div key={s.label} data-story-stat className="flex items-center gap-4">
                  <Icon className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.4} />
                  <div>
                    <div className="font-display text-2xl font-bold leading-none">
                      <span data-count={s.value} data-dec={s.decimals}>0</span>{s.suffix}
                    </div>
                    <div className="mt-1 text-xs text-ink/65">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div data-story-script className="absolute right-3 top-6 hidden -rotate-6 text-right font-script text-2xl leading-[0.95] text-brand/80 xl:block">
            Good<br />Food<br />Good<br />People<br />Always <span>♥</span>
          </div>
          <Leaf data-story-leaf="" className="absolute -bottom-3 right-2 hidden h-24 w-14 opacity-90 lg:block" />
        </div>
      </div>
    </section>
  );
}

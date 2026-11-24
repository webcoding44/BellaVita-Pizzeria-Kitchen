import { useRef } from "react";
import { Users, Heart, Cake, Briefcase } from "lucide-react";
import { gsap, scrollToId, useGsap } from "../lib/gsap";
import { img } from "../data";
import { Btn, Leaf } from "./ui";

const occasions = [
  { icon: Users, label: "Family Dining" },
  { icon: Heart, label: "Date Nights" },
  { icon: Cake, label: "Birthday Celebrations" },
  { icon: Briefcase, label: "Corporate Events" },
];

export default function Events() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    const st = { trigger: root.current, start: "top 70%" };
    const tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } });
    tl.from("[data-ev-line] > span", { yPercent: 115, duration: 1, stagger: 0.12, ease: "power4.out" })
      .from("[data-ev-p]", { y: 30, autoAlpha: 0, duration: 0.8 }, "-=0.6")
      .from("[data-ev-btn]", { y: 30, autoAlpha: 0, duration: 0.7 }, "-=0.5")
      .from("[data-ev-icon]", { y: 60, autoAlpha: 0, scale: 0.7, duration: 0.8, stagger: 0.12, ease: "back.out(1.7)" }, "-=1");
    gsap.from("[data-ev-img]", { scale: 1.3, autoAlpha: 0, duration: 1.6, ease: "expo.out", scrollTrigger: st });
    gsap.fromTo("[data-ev-img] img", { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } });
    gsap.to("[data-glow]", { opacity: 0.35, scale: 1.25, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.5 });
    gsap.to("[data-ev-leaf]", { rotate: "+=10", y: -8, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
  }, root, []);

  return (
    <section id="events" ref={root} className="relative overflow-hidden bg-forest text-white">
      <div className="grid lg:grid-cols-[1fr_1.1fr_1fr]">
        <div className="relative z-10 bg-brand px-6 py-14 lg:py-16 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            <span data-ev-line className="line-mask"><span>The Perfect Place</span></span>
            <span data-ev-line className="line-mask"><span>for Every Occasion</span></span>
          </h2>
          <p data-ev-p className="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
            Whether it's a family dinner, a date night or a celebration with friends, BellaVita makes every moment special.
          </p>
          <span data-ev-btn className="mt-7 inline-block">
            <Btn variant="light" onClick={() => scrollToId("contact")}>Book a Table <span aria-hidden>→</span></Btn>
          </span>
        </div>

        <div data-ev-img className="relative min-h-[300px] overflow-hidden">
          <img src={img.dining} alt="Candlelit dinner table" className="absolute -top-[8%] left-0 h-[116%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-transparent to-forest max-lg:hidden" />
          <span data-glow className="absolute left-[48%] top-[55%] h-24 w-24 rounded-full bg-amber-300/60 opacity-10 blur-2xl" />
          <span data-glow className="absolute left-[20%] top-[25%] h-16 w-16 rounded-full bg-amber-200/60 opacity-10 blur-2xl" />
        </div>

        <div className="relative flex items-center bg-forest px-6 py-12 lg:px-10">
          <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:divide-x xl:divide-white/15">
            {occasions.map(({ icon: Icon, label }) => (
              <div key={label} data-ev-icon className="group flex cursor-default flex-col items-center gap-3 px-2 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-amber-300 group-hover:bg-amber-300/10">
                  <Icon className="h-6 w-6 transition-colors group-hover:text-amber-300" strokeWidth={1.4} />
                </span>
                <span className="text-xs font-medium leading-tight text-white/90">{label}</span>
              </div>
            ))}
          </div>
          <Leaf data-ev-leaf="" className="absolute -bottom-4 right-3 hidden h-20 w-12 opacity-70 lg:block" />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { ArrowRight, Play, Leaf as LeafIcon, Flame, ChefHat, Users } from "lucide-react";
import { gsap, scrollToId, useGsap } from "../lib/gsap";
import { img } from "../data";
import { Btn, Leaf } from "./ui";

const features = [
  { icon: LeafIcon, label: ["Fresh", "Ingredients"] },
  { icon: Flame, label: ["Wood-Fired", "Oven"] },
  { icon: ChefHat, label: ["Authentic", "Italian Recipes"] },
  { icon: Users, label: ["Dine In", "or Takeaway"] },
];

export default function Hero({ ready, onWatch }: { ready: boolean; onWatch: () => void }) {
  const root = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGsap((self) => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
    tl.from("[data-hero-img]", { scale: 1.35, autoAlpha: 0, duration: 2.2, ease: "power3.out" }, 0)
      .from("[data-hero-eyebrow]", { y: 20, autoAlpha: 0, duration: 0.8 }, 0.2)
      .from("[data-hero-line] > span", { yPercent: 115, rotate: 4, duration: 1.2, stagger: 0.12 }, 0.3)
      .from("[data-hero-sub]", { y: 30, autoAlpha: 0, duration: 0.9 }, 0.9)
      .from("[data-hero-btn]", { y: 30, autoAlpha: 0, scale: 0.9, duration: 0.8, stagger: 0.12 }, 1.05)
      .from("[data-hero-feature]", { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.25)
      .from("[data-hero-script]", { autoAlpha: 0, rotate: -12, scale: 0.8, y: 20, duration: 1.1 }, 1.4)
      .from("[data-hero-leaf]", { autoAlpha: 0, scale: 0.3, rotate: -60, duration: 1.4, stagger: 0.15, ease: "back.out(1.6)" }, 1.2)
      .from("[data-hero-badge]", { autoAlpha: 0, scale: 0.4, rotate: 40, duration: 1, ease: "back.out(2)" }, 1.6);
    tlRef.current = tl;

    // ambient motion
    tl.add(() => { self.add(() => { gsap.to("[data-hero-img]", { scale: 1.06, duration: 14, yoyo: true, repeat: -1, ease: "sine.inOut" }); }); }, 2.3);
    gsap.to("[data-hero-leaf]", { y: "random(-14,14)", x: "random(-10,10)", duration: "random(3,5)", ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.4, from: "random" } });
    gsap.to("[data-badge-svg]", { rotate: "+=360", transformOrigin: "50% 50%", duration: 28, ease: "none", repeat: -1 });
    gsap.to("[data-steam]", { y: -140, autoAlpha: 0, scale: 2.2, duration: "random(3,5)", repeat: -1, ease: "sine.out", stagger: { each: 0.7, from: "random" }, x: "random(-30,30)" });
    gsap.fromTo("[data-ember]", { y: 0, autoAlpha: 0 }, { y: "random(-220,-120)", x: "random(-60,60)", autoAlpha: 0.9, duration: "random(2.5,4.5)", repeat: -1, ease: "power1.out", stagger: { each: 0.35, from: "random" } });

    // parallax on scroll
    gsap.to("[data-hero-bg]", { yPercent: 14, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to("[data-hero-copy]", { yPercent: -10, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: root.current, start: "30% top", end: "bottom top", scrub: true } });
  }, root, []);

  useEffect(() => {
    if (ready) tlRef.current?.play();
  }, [ready]);

  // mouse parallax
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const qx = gsap.quickTo("[data-hero-img-wrap]", "x", { duration: 1.2, ease: "power3.out" });
    const qy = gsap.quickTo("[data-hero-img-wrap]", "y", { duration: 1.2, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      qx((e.clientX / window.innerWidth - 0.5) * -26);
      qy((e.clientY / window.innerHeight - 0.5) * -18);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <section id="home" ref={root} className="relative overflow-hidden bg-cream pt-[108px] max-lg:pt-[72px]">
      {/* image */}
      <div data-hero-bg className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
        <div data-hero-img-wrap className="absolute -inset-6">
          <img
            data-hero-img
            src={img.hero}
            alt="Wood-fired margherita pizza"
            className="h-full w-full object-cover object-[60%_50%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-transparent lg:via-cream/30 max-lg:from-cream/95 max-lg:via-cream/70" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
        {/* steam & embers */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} data-steam className="absolute h-10 w-10 rounded-full bg-white/50 blur-xl" style={{ left: `${48 + i * 6}%`, top: `${44 + (i % 3) * 4}%` }} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} data-ember className="absolute h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_3px_rgba(255,170,60,0.8)]" style={{ left: `${42 + ((i * 37) % 50)}%`, top: `${40 + ((i * 13) % 30)}%` }} />
          ))}
        </div>
      </div>

      <div className="container-x relative z-10 flex min-h-[640px] flex-col justify-center py-14 lg:min-h-[700px]">
        <div data-hero-copy className="max-w-[560px]">
          <p data-hero-eyebrow className="eyebrow mb-5 text-ink/70">Authentic Italian Flavours</p>
          <h1 className="font-display text-[3.1rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]">
            <span data-hero-line className="line-mask"><span>Wood-Fired</span></span>
            <span data-hero-line className="line-mask"><span>Pizzas for</span></span>
            <span data-hero-line className="line-mask">
              <span className="text-brand">
                Good Times
                <svg viewBox="0 0 40 40" className="ml-1 mt-2 inline-block h-7 w-7 align-top text-brand" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M8 30 18 18M14 36 30 22M22 38 36 30" /></svg>
              </span>
            </span>
          </h1>
          <p data-hero-sub className="mt-6 max-w-[420px] text-[0.95rem] leading-relaxed text-ink/75">
            Handcrafted pizzas, fresh ingredients and unforgettable dining experiences — just like Italy, closer to home.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span data-hero-btn><Btn onClick={() => scrollToId("menu")}>Order Online <ArrowRight className="h-4 w-4" /></Btn></span>
            <span data-hero-btn>
              <button onClick={onWatch} className="group flex cursor-pointer items-center gap-3 rounded-full border border-ink/20 bg-white/70 py-1.5 pl-1.5 pr-6 text-sm font-semibold backdrop-blur transition hover:border-brand hover:bg-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-brand"><Play className="h-4 w-4 fill-current" /></span>
                Watch Our Story
              </button>
            </span>
          </div>

          <div className="mt-10 grid max-w-[520px] grid-cols-2 gap-y-4 sm:grid-cols-4 sm:divide-x sm:divide-ink/10">
            {features.map(({ icon: Icon, label }) => (
              <div key={label[0]} data-hero-feature className="flex flex-col items-center gap-1.5 px-2 text-center">
                <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
                <span className="text-[0.68rem] font-medium leading-tight text-ink/80">{label[0]}<br />{label[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* decorations */}
      <Leaf className="absolute bottom-4 left-[40%] z-10 hidden h-24 w-16 rotate-[70deg] lg:block" style={{ filter: "drop-shadow(0 8px 10px rgba(0,0,0,.3))" }} data-hero-leaf="" />
      <Leaf className="absolute bottom-16 left-[46%] z-10 hidden h-16 w-11 -rotate-[30deg] lg:block" style={{ filter: "drop-shadow(0 8px 10px rgba(0,0,0,.3))" }} data-hero-leaf="" />
      <div data-hero-script className="absolute right-6 top-28 z-10 hidden -rotate-6 text-right font-script text-3xl leading-[0.95] text-white drop-shadow-lg md:block">
        Good<br />Pizza<br />Brighter<br />Days <span className="text-red-400">♥</span>
      </div>

      <div data-hero-badge className="absolute bottom-10 right-8 z-10 hidden h-28 w-28 items-center justify-center rounded-full bg-brand/95 shadow-xl lg:flex">
        <svg data-badge-svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs><path id="circ" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" /></defs>
          <text fontSize="9.5" fill="#fff" letterSpacing="2.4" fontWeight="600"><textPath href="#circ">WOOD-FIRED • HANDMADE • SINCE 2014 • </textPath></text>
        </svg>
        <span className="text-3xl">🍕</span>
      </div>
    </section>
  );
}

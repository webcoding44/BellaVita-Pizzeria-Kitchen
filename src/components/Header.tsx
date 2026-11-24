import { useEffect, useRef, useState } from "react";
import { Gem, MapPin, Phone, User, Search, ShoppingBag, ArrowRight, Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, scrollToId, useGsap } from "../lib/gsap";
import { navLinks } from "../data";
import { Btn, Logo } from "./ui";
import { cn } from "../utils/cn";

export default function Header({ ready, cart }: { ready: boolean; cart: number }) {
  const root = useRef<HTMLElement>(null);
  const topbar = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLSpanElement>(null);
  const mobile = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const first = useRef(true);

  // intro + scroll behaviour
  useGsap(() => {
    const tl = gsap.timeline({ paused: true });
    tl.from("[data-h-item]", { y: -30, autoAlpha: 0, duration: 0.8, stagger: 0.07, ease: "power3.out" });
    (root.current as HTMLElement & { _tl?: gsap.core.Timeline })._tl = tl;

    navLinks.forEach((l) => {
      ScrollTrigger.create({
        trigger: document.getElementById(l.id),
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(l.id),
      });
    });
    ScrollTrigger.create({ start: 50, end: "max", onUpdate: (s) => setScrolled(s.scroll() > 50) });
  }, root, []);

  useEffect(() => {
    if (ready) (root.current as HTMLElement & { _tl?: gsap.core.Timeline })._tl?.play();
  }, [ready]);

  useEffect(() => {
    gsap.to(topbar.current, { height: scrolled ? 0 : 36, duration: 0.4, ease: "power2.out" });
  }, [scrolled]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (badge.current) gsap.fromTo(badge.current, { scale: 1.9 }, { scale: 1, duration: 0.6, ease: "elastic.out(1,0.4)" });
  }, [cart]);

  useEffect(() => {
    if (!mobile.current) return;
    if (open) {
      gsap.set(mobile.current, { display: "flex" });
      gsap.fromTo(mobile.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.out" });
      gsap.fromTo("[data-m-link]", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.06, delay: 0.15, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(mobile.current, { clipPath: "inset(0 0 100% 0)", duration: 0.4, ease: "power3.in", onComplete: () => { gsap.set(mobile.current, { display: "none" }); } });
    }
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50">
      <div ref={topbar} data-h-item className="h-9 overflow-hidden bg-forest text-[0.7rem] text-white/90">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-2 max-sm:mx-auto">
            <Gem className="h-3.5 w-3.5 text-amber-400" />
            <span>For modern website design contact us</span>
            <button onClick={() => go("contact")} className="ml-1 cursor-pointer rounded-full bg-white px-3 py-1 text-[0.65rem] font-semibold text-ink transition hover:bg-amber-200">
              Get a Free Quote
            </button>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <button onClick={() => go("locations")} className="flex cursor-pointer items-center gap-1.5 hover:text-amber-300"><MapPin className="h-3.5 w-3.5" /> Find a Location</button>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-amber-300"><Phone className="h-3.5 w-3.5" /> Call Us</a>
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Login</span>
          </div>
        </div>
      </div>

      <div className={cn("border-b border-black/5 bg-white/90 backdrop-blur-xl transition-shadow duration-500", scrolled && "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)]")}>
        <div className={cn("container-x flex items-center justify-between transition-all duration-500", scrolled ? "h-[62px]" : "h-[72px]")}>
          <button data-h-item onClick={() => go("home")} className="cursor-pointer" aria-label="BellaVita home"><Logo /></button>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <button
                key={l.id}
                data-h-item
                onClick={() => go(l.id)}
                className={cn("group relative cursor-pointer py-2 text-[0.82rem] font-medium transition-colors", active === l.id ? "text-brand" : "text-ink/80 hover:text-brand")}
              >
                {l.label}
                <span className={cn("absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-brand transition-transform duration-500", active === l.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <button data-h-item aria-label="Search" className="hidden cursor-pointer text-ink/80 transition hover:text-brand sm:block"><Search className="h-[18px] w-[18px]" /></button>
            <button data-h-item onClick={() => go("menu")} aria-label="Cart" className="relative cursor-pointer text-ink/80 transition hover:text-brand">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cart > 0 && (
                <span ref={badge} className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[0.6rem] font-bold text-white">{cart}</span>
              )}
            </button>
            <span data-h-item className="hidden sm:block">
              <Btn onClick={() => go("contact")} className="!px-5 !py-2.5 text-[0.8rem]">Book a Table <ArrowRight className="h-3.5 w-3.5" /></Btn>
            </span>
            <button data-h-item onClick={() => setOpen((o) => !o)} aria-label="Menu" className="cursor-pointer lg:hidden">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div ref={mobile} style={{ display: "none" }} className="absolute inset-x-0 top-full flex-col gap-1 bg-white px-6 pb-8 pt-4 shadow-2xl lg:hidden">
        {navLinks.map((l) => (
          <button key={l.id} data-m-link onClick={() => go(l.id)} className={cn("cursor-pointer border-b border-black/5 py-3 text-left font-display text-2xl", active === l.id ? "text-brand" : "text-ink")}>
            {l.label}
          </button>
        ))}
        <div data-m-link className="mt-4"><Btn onClick={() => go("contact")} className="w-full">Book a Table <ArrowRight className="h-4 w-4" /></Btn></div>
      </div>
    </header>
  );
}

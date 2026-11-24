import { useRef } from "react";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { gsap, scrollToId, useGsap } from "../lib/gsap";
import { Btn, Facebook, Instagram, Leaf, Logo, XIcon, Youtube } from "./ui";

export function Cta() {
  const root = useRef<HTMLElement>(null);
  useGsap(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%" }, defaults: { ease: "power3.out" } });
    tl.from("[data-cta-t]", { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.12 })
      .from("[data-cta-b]", { scale: 0.7, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2)" }, "-=0.4")
      .from("[data-cta-leaf]", { x: (i) => (i ? 100 : -100), autoAlpha: 0, rotate: 40, duration: 1.2, stagger: 0.1 }, 0);
    gsap.to("[data-cta-leaf]", { y: -8, rotate: "+=6", duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.5 });
  }, root, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,38,30,0.35),transparent_70%)]" />
      <Leaf data-cta-leaf="" className="absolute -left-4 top-1/2 h-24 w-14 -translate-y-1/2 rotate-[60deg]" />
      <Leaf data-cta-leaf="" className="absolute -right-4 top-1/2 h-24 w-14 -translate-y-1/2 -rotate-[60deg]" />
      <div className="container-x relative flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
        <div className="lg:pl-24">
          <h2 data-cta-t className="font-display text-3xl font-bold italic sm:text-4xl">Craving Great Food?</h2>
          <p data-cta-t className="mt-1 text-sm text-white/70">Order online or book your table for an unforgettable experience.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 lg:pr-24">
          <span data-cta-b><Btn onClick={() => scrollToId("menu")}>Order Online <ArrowRight className="h-4 w-4" /></Btn></span>
          <span data-cta-b><Btn variant="outline" onClick={() => scrollToId("contact")}>Book a Table <ArrowRight className="h-4 w-4" /></Btn></span>
        </div>
      </div>
    </section>
  );
}

const cols = [
  { title: "Quick Links", links: [["Home", "home"], ["Menu", "menu"], ["Our Story", "story"], ["Locations", "locations"], ["Events", "events"], ["Contact", "contact"]] },
  { title: "Our Menu", links: [["Pizzas", "signature"], ["Pasta", "signature"], ["Appetizers", "signature"], ["Salads", "signature"], ["Desserts", "signature"], ["Beverages", "signature"]] },
  { title: "Help", links: [["FAQs", "contact"], ["Track Order", "contact"], ["Reservations", "contact"], ["Delivery Info", "contact"], ["Returns & Refunds", "contact"], ["Terms of Service", "contact"]] },
];

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useGsap(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%" }, defaults: { ease: "power3.out" } });
    tl.from("[data-f-col]", { y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.1 })
      .from("[data-f-link]", { x: -14, autoAlpha: 0, duration: 0.5, stagger: 0.02 }, "-=0.6")
      .from("[data-f-script]", { autoAlpha: 0, rotate: -10, y: 20, duration: 1 }, "-=0.6");
  }, root, []);

  return (
    <footer ref={root} className="bg-cream pt-12">
      <div className="container-x grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1.3fr_0.9fr]">
        <div data-f-col>
          <Logo />
          <p className="mt-4 text-sm text-ink/65">Good Food. Good People.<br />Always a Slice Ahead.</p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Facebook, Youtube, XIcon].map((I, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-white">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title} data-f-col>
            <h4 className="mb-3 text-xs font-bold">{c.title}</h4>
            <ul className="space-y-2 text-xs text-ink/65">
              {c.links.map(([label, id]) => (
                <li key={label} data-f-link><button onClick={() => scrollToId(id)} className="cursor-pointer transition-all duration-300 hover:translate-x-1 hover:text-brand">{label}</button></li>
              ))}
            </ul>
          </div>
        ))}
        <div data-f-col>
          <h4 className="mb-3 text-xs font-bold">Contact Us</h4>
          <ul className="space-y-3 text-xs text-ink/65">
            <li data-f-link className="flex gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" />123 Food Street, Zirakpur, Punjab 140603, India</li>
            <li data-f-link className="flex gap-2"><Phone className="h-3.5 w-3.5 shrink-0 text-ink" />+91 98765 43210</li>
            <li data-f-link className="flex gap-2"><Mail className="h-3.5 w-3.5 shrink-0 text-ink" />hello@bellavita.in</li>
            <li data-f-link className="flex gap-2"><Clock className="h-3.5 w-3.5 shrink-0 text-ink" />Mon – Sun: 11 AM – 11 PM</li>
          </ul>
        </div>
        <div data-f-script className="hidden -rotate-6 font-script text-3xl leading-[0.95] text-ink/80 lg:block">
          Pizza<br />Brings<br />People<br />Together <span className="text-brand">♥</span>
        </div>
      </div>
      <div className="border-t border-black/10 py-4">
        <div className="container-x flex flex-col items-center justify-between gap-2 text-[0.7rem] text-ink/55 sm:flex-row">
          <span>© 2024 BellaVita Pizzeria. All rights reserved.</span>
          <span className="flex gap-6"><span className="cursor-pointer hover:text-brand">Privacy Policy</span><span className="cursor-pointer hover:text-brand">Terms of Service</span></span>
        </div>
      </div>
    </footer>
  );
}

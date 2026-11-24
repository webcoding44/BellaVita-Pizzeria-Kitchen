import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import type { Dish } from "./data";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ExploreMenu from "./components/ExploreMenu";
import Story from "./components/Story";
import Signature from "./components/Signature";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import Locations from "./components/Locations";
import Reservation from "./components/Reservation";
import { Cta, Footer } from "./components/CtaFooter";
import StoryModal from "./components/StoryModal";

export default function App() {
  const [ready, setReady] = useState(false);
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  // scroll progress bar
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => { gsap.set(bar.current, { scaleX: s.progress }); },
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      st.kill();
      window.removeEventListener("load", refresh);
    };
  }, []);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  const add = useCallback((d: Dish) => {
    setCart((c) => c + 1);
    setToast(d.name);
    const el = toastRef.current;
    gsap.killTweensOf(el);
    gsap.fromTo(el, { y: 80, autoAlpha: 0, scale: 0.9 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" });
    gsap.to(el, { y: 80, autoAlpha: 0, duration: 0.4, delay: 2.4, ease: "power2.in" });
  }, []);

  return (
    <div className="relative">
      <Preloader onDone={() => setReady(true)} />
      <div ref={bar} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand" />
      <Header ready={ready} cart={cart} />
      <main>
        <Hero ready={ready} onWatch={() => setModal(true)} />
        <Marquee />
        <ExploreMenu onPick={setCat} />
        <Story />
        <Signature cat={cat} setCat={setCat} onAdd={add} />
        <Events />
        <Testimonials />
        <Locations />
        <Reservation />
        <Cta />
      </main>
      <Footer />
      <StoryModal open={modal} onClose={() => setModal(false)} />

      <div ref={toastRef} className="invisible fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-sm text-white shadow-2xl">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand"><Check className="h-4 w-4" /></span>
        <span><b>{toast}</b> added to your order</span>
      </div>
    </div>
  );
}

import { useRef, useState, type FormEvent } from "react";
import { CalendarDays, Clock, Users, MapPin, Check, Phone, Mail } from "lucide-react";
import { gsap, useGsap } from "../lib/gsap";
import { locations } from "../data";
import { Btn, Leaf } from "./ui";

const field = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm transition focus:border-brand focus:ring-4 focus:ring-brand/10";

export default function Reservation() {
  const root = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  useGsap(() => {
    const st = { trigger: root.current, start: "top 70%" };
    const tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: "power3.out" } });
    tl.from("[data-rs-line] > span", { yPercent: 115, duration: 1, stagger: 0.12, ease: "power4.out" })
      .from("[data-rs-p]", { y: 30, autoAlpha: 0, duration: 0.8 }, "-=0.6")
      .from("[data-rs-info]", { x: -30, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
      .from("[data-rs-card]", { y: 80, autoAlpha: 0, duration: 1 }, 0.2)
      .from("[data-rs-field]", { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, 0.6);
    gsap.to("[data-rs-leaf]", { rotate: "+=12", y: -12, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.6 });
  }, root, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const tl = gsap.timeline();
    tl.to(form.current, { autoAlpha: 0, y: -30, duration: 0.5, ease: "power2.in", onComplete: () => setSent(true) });
    tl.add(() => {
      gsap.set(done.current, { display: "flex" });
      gsap.fromTo(done.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" });
      gsap.fromTo("[data-check]", { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1,0.5)" });
      gsap.fromTo("[data-conf]", { y: 0, scale: 0, autoAlpha: 1 }, {
        y: () => gsap.utils.random(-140, -40), x: () => gsap.utils.random(-140, 140), rotate: () => gsap.utils.random(-360, 360), scale: () => gsap.utils.random(0.8, 1.6),
        autoAlpha: 0, duration: 1.8, ease: "power2.out", stagger: 0.02,
      });
    });
  };

  const reset = () => {
    gsap.to(done.current, { autoAlpha: 0, duration: 0.3, onComplete: () => {
      gsap.set(done.current, { display: "none" });
      setSent(false); setName("");
      form.current?.reset();
      gsap.fromTo(form.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 });
    } });
  };

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-forest py-20 text-white">
      <Leaf data-rs-leaf="" className="absolute -left-4 top-10 hidden h-32 w-20 rotate-[30deg] opacity-40 lg:block" />
      <Leaf data-rs-leaf="" className="absolute bottom-6 left-[44%] hidden h-24 w-16 -rotate-[40deg] opacity-30 lg:block" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="eyebrow mb-4 text-amber-300">Reservations</p>
          <h2 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
            <span data-rs-line className="line-mask"><span>Reserve Your</span></span>
            <span data-rs-line className="line-mask"><span className="italic text-amber-300">Table Tonight</span></span>
          </h2>
          <p data-rs-p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            Tell us when you'd like to join us and we'll keep the best seat by the oven warm. Groups of 8+ — please call us directly.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div data-rs-info className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><MapPin className="h-4 w-4 text-amber-300" /></span>123 Food Street, Zirakpur, Punjab 140603</div>
            <div data-rs-info className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><Phone className="h-4 w-4 text-amber-300" /></span>+91 98765 43210</div>
            <div data-rs-info className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><Mail className="h-4 w-4 text-amber-300" /></span>hello@bellavita.in</div>
            <div data-rs-info className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><Clock className="h-4 w-4 text-amber-300" /></span>Mon – Sun: 11 AM – 11 PM</div>
          </div>
        </div>

        <div data-rs-card className="relative rounded-3xl bg-cream p-6 text-ink shadow-2xl shadow-black/40 sm:p-8">
          <form ref={form} onSubmit={submit} className="grid gap-4 sm:grid-cols-2" style={{ display: sent ? "none" : undefined }}>
            <h3 data-rs-field className="font-display text-2xl font-bold sm:col-span-2">Book a Table</h3>
            <input data-rs-field required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} />
            <input data-rs-field required type="tel" placeholder="Phone number" className={field} />
            <label data-rs-field className="relative"><CalendarDays className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-brand" /><input required type="date" className={field} /></label>
            <label data-rs-field className="relative"><Clock className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-brand" />
              <select required defaultValue="" className={field + " appearance-none"}>
                <option value="" disabled>Select time</option>
                {["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label data-rs-field className="relative"><Users className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-brand" />
              <select required defaultValue="" className={field + " appearance-none"}>
                <option value="" disabled>Guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
              </select>
            </label>
            <label data-rs-field className="relative"><MapPin className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-brand" />
              <select required defaultValue={locations[0].city} className={field + " appearance-none"}>
                {locations.map((l) => <option key={l.city}>{l.city}</option>)}
              </select>
            </label>
            <div data-rs-field className="sm:col-span-2"><Btn type="submit" className="w-full !py-3.5">Confirm Reservation →</Btn></div>
          </form>

          <div ref={done} style={{ display: "none" }} className="relative min-h-[360px] flex-col items-center justify-center text-center">
            <div className="relative">
              <span data-check className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white"><Check className="h-10 w-10" strokeWidth={3} /></span>
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} data-conf className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm opacity-0" style={{ background: ["#b3261e", "#f5c15b", "#1f3326", "#3f7a4a"][i % 4] }} />
              ))}
            </div>
            <h3 className="mt-6 font-display text-3xl font-bold">Grazie, {name || "friend"}!</h3>
            <p className="mt-2 max-w-xs text-sm text-ink/65">Your table is reserved. We've sent the details to your phone — see you soon at BellaVita.</p>
            <button onClick={reset} className="mt-6 cursor-pointer text-sm font-semibold text-brand underline-offset-4 hover:underline">Make another reservation</button>
          </div>
        </div>
      </div>
    </section>
  );
}

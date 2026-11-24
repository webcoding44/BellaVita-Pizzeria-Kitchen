import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "../lib/gsap";
import { cn } from "../utils/cn";

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden>
        <circle cx="32" cy="32" r="30" fill="#b3261e" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#fbf7f0" strokeWidth="1.5" strokeDasharray="2 3" />
        <path d="M32 50 L16 22 Q32 12 48 22 Z" fill="#f5c15b" />
        <path d="M16 22 Q32 12 48 22" fill="none" stroke="#e6a43a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="29" cy="27" r="2.6" fill="#b3261e" />
        <circle cx="37" cy="30" r="2.4" fill="#b3261e" />
        <circle cx="32" cy="38" r="2.2" fill="#b3261e" />
        <path d="M44 14c4-1 7 1 8 4-3 2-7 1-8-4z" fill="#3f7a4a" />
      </svg>
      <div className="leading-none">
        <div className={cn("font-display text-[1.65rem] font-bold tracking-tight", light ? "text-white" : "text-ink")}>
          BellaVita
        </div>
        <div className={cn("mt-0.5 text-[0.5rem] font-semibold tracking-[0.2em]", light ? "text-white/70" : "text-ink/60")}>
          PIZZERIA &amp; KITCHEN
        </div>
      </div>
    </div>
  );
}

export function Leaf({ className, style, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 160" className={className} style={style} aria-hidden {...rest}>
      <defs>
        <linearGradient id="leafg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5fae5b" />
          <stop offset="1" stopColor="#1f5d34" />
        </linearGradient>
      </defs>
      <path d="M60 4C108 40 118 100 60 156 2 100 12 40 60 4Z" fill="url(#leafg)" />
      <path d="M60 14V150M60 50 36 70M60 70 84 90M60 96 38 112M60 50l24 20M60 96l22 16" stroke="#cfe9c8" strokeOpacity=".55" strokeWidth="2" fill="none" />
    </svg>
  );
}

export const Instagram = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
export const Facebook = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
    <path d="M14 8V6.5c0-.7.3-1 1-1h2V2h-3c-3 0-4.5 1.8-4.5 4.4V8H7v3.5h2.5V22H14V11.5h2.7L17 8h-3z" />
  </svg>
);
export const Youtube = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800C22 15.200 22 12 22 12s0-3.200-.4-4.800zM10 15V9l5.200 3z" />
  </svg>
);
export const XIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
    <path d="M17.800 3h3l-6.500 7.500L22 21h-6l-4.700-6.100L5.900 21h-3l7-8L2.500 3h6.100l4.200 5.600L17.800 3zm-1 16.200h1.700L7.300 4.700H5.500l11.300 14.500z" />
  </svg>
);

export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path fill="#EA4335" d="M24 9.500c3.500 0 6.600 1.200 9.100 3.600l6.800-6.800C35.800 2.400 30.300 0 24 0 14.600 0 6.500 5.400 2.600 13.300l7.900 6.100C12.400 13.600 17.700 9.500 24 9.500z" />
      <path fill="#4285F4" d="M46.500 24.500c0-1.600-.1-3.100-.4-4.500H24v9h12.700c-.6 3-2.200 5.500-4.700 7.200l7.600 5.900c4.400-4.100 6.900-10.100 6.900-17.600z" />
      <path fill="#FBBC05" d="M10.500 28.600A14.500 14.500 0 0 1 9.500 24c0-1.600.3-3.100.8-4.600l-7.900-6.100A24 24 0 0 0 0 24c0 3.900.9 7.500 2.600 10.700l7.900-6.100z" />
      <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.600-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.900l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

type BtnProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "dark";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/** Button with a subtle gsap magnetic hover. */
export function Btn({ children, variant = "primary", className, onClick, type = "button" }: BtnProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.22,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });

  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/25",
    outline: "border border-white/70 text-white hover:bg-white hover:text-ink backdrop-blur-sm",
    light: "bg-white text-brand hover:bg-cream",
    dark: "bg-ink text-white hover:bg-black",
  }[variant];

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={leave}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300",
        styles,
        className
      )}
    >
      {children}
    </button>
  );
}

/** Section heading with masked reveal (animated by parent via [data-reveal-title]) */
export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl", className)}>
      <span className="line-mask">
        <span data-title>{children}</span>
      </span>
    </h2>
  );
}

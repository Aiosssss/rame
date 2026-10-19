import { HeroCapsules } from "./HeroCapsules";
import { useEffect, useRef } from "react";
import { setupHeroMotion } from "@/lib/motion/hero";
import { AnimatedLabel } from "@/components/ui/AnimatedLabel";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => setupHeroMotion(ref.current!), []);
  return (
    <section
      ref={ref}
      className="hero is-ready"
      data-art-ready="false"
      aria-labelledby="hero-title"
    >
      <div className="hero-stage">
        <HeroCapsules />
        <HeroCapsules compact />
        <h1 id="hero-title">
          <span className="hero-line line-one">
            <span className="hero-word">Keluar.</span>
          </span>
          <span className="hero-line line-two">
            <span className="hero-word">Ketemu.</span>
          </span>
          <span className="hero-line line-three">
            <span className="hero-word">Bikin cerita.</span>
          </span>
        </h1>
        <div className="hero-art" aria-hidden="true">
          <svg className="hero-curve" viewBox="0 0 210 80">
            <path d="M12 13h145c72 0 50 62 12 62" />
          </svg>
          <img
            className="hero-star"
            src="/assets/hero-star.webp"
            srcSet="/assets/hero-star-128.webp 128w, /assets/hero-star-192.webp 192w, /assets/hero-star-256.webp 256w, /assets/hero-star-512.webp 512w, /assets/hero-star.webp 768w"
            sizes="(max-width: 700px) 21vw, 15vw"
            width="1254"
            height="1254"
            alt=""
            decoding="async"
            fetchPriority="auto"
          />
          <img
            className="hero-ring"
            src="/assets/hero-ring.webp"
            srcSet="/assets/hero-ring-128.webp 128w, /assets/hero-ring-192.webp 192w, /assets/hero-ring-256.webp 256w, /assets/hero-ring-512.webp 512w, /assets/hero-ring.webp 768w"
            sizes="(max-width: 700px) 20vw, 16vw"
            width="1254"
            height="1254"
            alt=""
            decoding="async"
            fetchPriority="auto"
          />
          <img
            className="hero-ticket"
            src="/assets/hero-ticket.webp"
            srcSet="/assets/hero-ticket-128.webp 128w, /assets/hero-ticket-192.webp 192w, /assets/hero-ticket-256.webp 256w, /assets/hero-ticket-512.webp 512w, /assets/hero-ticket.webp 1200w"
            sizes="(max-width: 700px) 25vw, 24vw"
            width="1536"
            height="1024"
            alt=""
            decoding="async"
            fetchPriority="auto"
          />
          <img
            className="hero-disc"
            src="/assets/hero-disc.webp"
            srcSet="/assets/hero-disc-128.webp 128w, /assets/hero-disc-192.webp 192w, /assets/hero-disc-256.webp 256w, /assets/hero-disc-512.webp 512w, /assets/hero-disc.webp 900w"
            sizes="(max-width: 700px) 22vw, 20vw"
            width="1254"
            height="1254"
            alt=""
            decoding="async"
            fetchPriority="auto"
          />
          <img
            className="hero-orb"
            src="/assets/hero-orb.webp"
            srcSet="/assets/hero-orb-128.webp 128w, /assets/hero-orb-256.webp 256w, /assets/hero-orb.webp 384w"
            sizes="(max-width: 700px) 11vw, 8vw"
            width="1254"
            height="1254"
            alt=""
            decoding="async"
            fetchPriority="auto"
          />
          <span className="dot dot-peach"></span>
          <span className="dot dot-coral"></span>
          <span className="dot dot-blue"></span>
          <span className="dot dot-lime"></span>
          <span className="dot dot-small-blue"></span>
          <span className="dot dot-purple"></span>
        </div>
        <div className="hero-cta">
          <p>
            Satu tiket,
            <br />
            banyak cerita.
          </p>
          <a className="button" href="#event" aria-label="Cari Event">
            <span className="cta-label" aria-hidden="true">
              <span data-animated-label>
                <AnimatedLabel text="Cari" />
              </span>
              <span data-animated-label>
                <AnimatedLabel text="Event" offset={4} />
              </span>
            </span>
            <span className="cta-arrow" aria-hidden="true">
              <svg className="icon">
                <use href="#arrow" />
              </svg>
              <svg className="icon">
                <use href="#arrow" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

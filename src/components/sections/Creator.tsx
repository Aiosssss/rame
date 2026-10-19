import { whenNear } from "@/lib/when-near";
import { DeferredImage } from "@/components/ui/DeferredImage";
import { useEffect, useRef } from "react";
import { setupCreatorMotion } from "@/lib/motion/creator";
import { setupArtworkMotion } from "@/lib/motion/artwork";
import { useDialogs } from "@/components/dialogs/DialogProvider";
export function Creator() {
  const { open } = useDialogs();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current!;
    return whenNear(section, () => {
      const cleanCopy = setupCreatorMotion(section);
      const cleanArt = setupArtworkMotion(section);
      return () => {
        cleanCopy();
        cleanArt();
      };
    });
  }, []);
  return (
    <section
      ref={ref}
      className="creator panel"
      id="buat-event"
      aria-labelledby="creator-title"
    >
      <div className="creator-copy">
        <h2 id="creator-title" aria-label="Punya ide seru? Bikin rame.">
          <span className="creator-heading-line">
            <span className="creator-heading-text">Punya ide seru?</span>
          </span>
          <span className="creator-heading-line creator-heading-lime">
            <span className="creator-heading-text">Bikin rame.</span>
          </span>
        </h2>
        <p>
          Dari konser, workshop, sampai gathering komunitas. Wujudkan event
          impianmu dan temui lebih banyak orang hebat.
        </p>
        <button
          className="button"
          data-action="create"
          onClick={() => open({ kind: "creator" })}
        >
          <span className="creator-button-label">Buat Event Sekarang</span>
          <svg className="icon" aria-hidden="true">
            <use href="#arrow" />
          </svg>
        </button>
      </div>
      <div className="creator-scene" aria-hidden="true">
        <picture className="creator-model creator-megaphone">
          <DeferredImage
            src="/assets/creator-megaphone-960.webp"
            srcSet="/assets/creator-megaphone-480.webp 480w, /assets/creator-megaphone-960.webp 960w"
            sizes="(max-width: 700px) 75vw, 34vw"
            width="1254"
            height="1254"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
        <picture className="creator-model creator-ticket">
          <DeferredImage
            src="/assets/step-ticket.webp"
            srcSet="/assets/step-ticket-128.webp 128w, /assets/step-ticket-192.webp 192w, /assets/step-ticket-256.webp 256w, /assets/step-ticket.webp 512w"
            sizes="(max-width: 700px) 24vw, 13vw"
            width="512"
            height="512"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
        <picture className="creator-model creator-star">
          <DeferredImage
            src="/assets/hero-star.webp"
            srcSet="/assets/hero-star-128.webp 128w, /assets/hero-star-192.webp 192w, /assets/hero-star-256.webp 256w, /assets/hero-star-512.webp 512w, /assets/hero-star.webp 768w"
            sizes="(max-width: 700px) 16vw, 9vw"
            width="512"
            height="512"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}

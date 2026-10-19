import { useEffect, useRef } from "react";
import { setupStepsMotion } from "@/lib/motion/steps";
import { setupArtworkMotion } from "@/lib/motion/artwork";
export function Steps() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current!;
    const cleanText = setupStepsMotion(section);
    const cleanArt = setupArtworkMotion(section);
    return () => {
      cleanText();
      cleanArt();
    };
  }, []);
  return (
    <section
      ref={ref}
      className="steps panel"
      id="cara-beli"
      aria-labelledby="steps-title"
    >
      <h2 id="steps-title">
        Tiga langkah. <span>Langsung berangkat.</span>
      </h2>
      <ol className="step-list">
        <li>
          <div className="step-art" aria-hidden="true">
            <img
              src="/assets/step-search.webp"
              srcSet="/assets/step-search-128.webp 128w, /assets/step-search-192.webp 192w, /assets/step-search-256.webp 256w, /assets/step-search.webp 512w"
              sizes="(max-width: 700px) 100px, 160px"
              width="512"
              height="512"
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div>
            <h3>1. Cari Event</h3>
            <p>Temukan event favoritmu dari berbagai kota.</p>
          </div>
        </li>
        <li>
          <div className="step-art" aria-hidden="true">
            <img
              src="/assets/step-ticket.webp"
              srcSet="/assets/step-ticket-128.webp 128w, /assets/step-ticket-192.webp 192w, /assets/step-ticket-256.webp 256w, /assets/step-ticket.webp 512w"
              sizes="(max-width: 700px) 100px, 160px"
              width="512"
              height="512"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <h3>2. Pilih Tiket</h3>
            <p>Pilih kategori tiket dan lakukan pembayaran dengan aman.</p>
          </div>
        </li>
        <li>
          <div className="step-art" aria-hidden="true">
            <img
              src="/assets/step-plane.webp"
              srcSet="/assets/step-plane-128.webp 128w, /assets/step-plane-192.webp 192w, /assets/step-plane-256.webp 256w, /assets/step-plane.webp 512w"
              sizes="(max-width: 700px) 100px, 160px"
              width="512"
              height="512"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <h3>3. Siap Berangkat</h3>
            <p>Dapatkan e-ticket dan nikmati eventnya!</p>
          </div>
        </li>
      </ol>
    </section>
  );
}

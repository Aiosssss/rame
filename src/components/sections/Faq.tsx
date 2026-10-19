import { whenNear } from "@/lib/when-near";
import { DeferredImage } from "@/components/ui/DeferredImage";
import { useEffect, useRef } from "react";
import { setupFaqMotion } from "@/lib/motion/faq";
import { setupFaqAccordion } from "@/lib/motion/accordion";
import { setupArtworkMotion } from "@/lib/motion/artwork";
export function Faq() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current!;
    return whenNear(section, () => {
      const cleanMotion = setupFaqMotion(section);
      const cleanAccordion = setupFaqAccordion(section);
      const cleanArt = setupArtworkMotion(section);
      return () => {
        cleanMotion();
        cleanAccordion();
        cleanArt();
      };
    });
  }, []);
  return (
    <section
      ref={ref}
      className="faq panel"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="faq-copy">
        <h2 id="faq-title" aria-label="Masih penasaran? Tanya di sini.">
          <span className="faq-heading-line">
            <span className="faq-heading-text">Masih penasaran?</span>
          </span>
          <span className="faq-heading-line faq-heading-blue">
            <span className="faq-heading-text">Tanya di sini.</span>
          </span>
        </h2>
        <p>Beberapa jawaban sebelum kamu mulai bikin cerita.</p>
        <picture className="faq-art" aria-hidden="true">
          <DeferredImage
            src="/assets/faq-chat-840.webp"
            srcSet="/assets/faq-chat-420.webp 420w, /assets/faq-chat-840.webp 840w"
            sizes="(max-width: 700px) 132px, (max-width: 1000px) 26vw, 320px"
            width="1254"
            height="1254"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="faq-list" aria-label="Pertanyaan yang sering ditanyakan">
        <details name="rame-faq" open>
          <summary>
            <span>Gimana cara cari event yang cocok?</span>
            <span className="faq-toggle" aria-hidden="true"></span>
          </summary>
          <div className="faq-answer">
            <p>
              Cari nama event, artis, atau lokasi lewat kolom pencarian. Kamu
              juga bisa pilih kategori dan kota untuk menemukan rencana yang
              paling pas.
            </p>
          </div>
        </details>
        <details name="rame-faq">
          <summary>
            <span>Bisa cari event di kota lain?</span>
            <span className="faq-toggle" aria-hidden="true"></span>
          </summary>
          <div className="faq-answer">
            <p>
              Bisa. Pilih kota di sebelah kolom pencarian, lalu lihat event yang
              tersedia. Pilih Semua kota kalau kamu masih ingin menjelajah.
            </p>
          </div>
        </details>
        <details name="rame-faq">
          <summary>
            <span>Info event selengkapnya ada di mana?</span>
            <span className="faq-toggle" aria-hidden="true"></span>
          </summary>
          <div className="faq-answer">
            <p>
              Ketuk kartu event untuk melihat tanggal, lokasi, dan harga
              tiketnya. Cek dulu detailnya supaya sesuai dengan rencana
              berangkatmu.
            </p>
          </div>
        </details>
        <details name="rame-faq">
          <summary>
            <span>Sudah bisa beli tiket di sini?</span>
            <span className="faq-toggle" aria-hidden="true"></span>
          </summary>
          <div className="faq-answer">
            <p>
              Untuk saat ini, kamu bisa menjelajahi event dan melihat detailnya
              dulu. Pemesanan serta pembayaran tiket belum tersedia di pratinjau
              ini.
            </p>
          </div>
        </details>
        <details name="rame-faq">
          <summary>
            <span>Bisa bikin event sendiri?</span>
            <span className="faq-toggle" aria-hidden="true"></span>
          </summary>
          <div className="faq-answer">
            <p>
              Tentu. Mulai dari Buat Event, isi nama event, kota, dan ceritakan
              idemu. Simpan dulu drafnya sambil menyiapkan rencana serumu.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}

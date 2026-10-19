import { useDialogs } from "@/components/dialogs/DialogProvider";
import type { InfoKey } from "@/lib/data/info";

export function Footer() {
  const { open } = useDialogs();

  return (
    <footer
      className="footer"
      onClick={(event) => {
        const button = (event.target as Element).closest<HTMLButtonElement>(
          "[data-info]",
        );
        if (button) open({ kind: "info", key: button.dataset.info as InfoKey });
        const link = (event.target as Element).closest<HTMLElement>(
          "[data-focus]",
        );
        if (link)
          requestAnimationFrame(() =>
            document
              .querySelector<HTMLElement>(
                link.dataset.focus === "city"
                  ? "#city-trigger"
                  : ".filters button",
              )
              ?.focus({ preventScroll: true }),
          );
      }}
    >
      <div className="footer-brand">
        <a className="brand" href="#beranda" aria-label="Rame — beranda">
          <img
            src="/assets/rame-logo.webp"
            width="116"
            height="37"
            alt="rame"
          />
        </a>
        <p>
          Lebih dari tiket.
          <br />
          Tempat semua cerita dimulai.
        </p>
      </div>
      <div className="footer-column">
        <h3>Jelajahi</h3>
        <a href="#event">Event</a>
        <a href="#event" data-focus="category">
          Kategori
        </a>
        <a href="#event" data-focus="city">
          Kota
        </a>
      </div>
      <div className="footer-column">
        <h3>Bantuan</h3>
        <a href="#cara-beli">Cara Beli</a>
        <a href="#faq">FAQ</a>
        <button data-info="privacy">Kebijakan Privasi</button>
      </div>
      <div className="footer-column">
        <h3>Tentang</h3>
        <button data-info="about">Tentang Rame</button>
        <a href="#buat-event">Untuk Event Creator</a>
        <button data-info="contact">Kontak</button>
      </div>
      <div className="footer-social">
        <nav className="social-links" aria-label="Media sosial Rame">
          <button data-info="social" aria-label="Instagram">
            <svg className="icon">
              <use href="#instagram" />
            </svg>
          </button>
          <button data-info="social" aria-label="X">
            <svg className="icon">
              <use href="#x-social" />
            </svg>
          </button>
          <button data-info="social" aria-label="TikTok">
            <svg className="icon">
              <use href="#tiktok" />
            </svg>
          </button>
          <button data-info="social" aria-label="YouTube">
            <svg className="icon">
              <use href="#youtube" />
            </svg>
          </button>
        </nav>
      </div>
    </footer>
  );
}

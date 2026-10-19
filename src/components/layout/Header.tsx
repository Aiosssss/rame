import { useEffect, useRef } from "react";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { setupNavigationIndicator } from "@/lib/motion/navigation";
import { AnimatedLabel } from "@/components/ui/AnimatedLabel";
import { useDialogs } from "@/components/dialogs/DialogProvider";

export function Header() {
  const { isOpen, setOpen, headerRef, toggleRef } = useMobileMenu();
  const navRef = useRef<HTMLElement>(null);
  const { open, ticketsOpen } = useDialogs();
  useEffect(() => setupNavigationIndicator(navRef.current!), []);
  useEffect(() => {
    const button = headerRef.current!.querySelector(".my-tickets")!;
    const desktop = matchMedia("(min-width: 701px)");
    const syncTarget = () =>
      button.setAttribute(
        "aria-controls",
        desktop.matches ? "ticket-drawer" : "detail-dialog",
      );
    syncTarget();
    desktop.addEventListener("change", syncTarget);
    return () => desktop.removeEventListener("change", syncTarget);
  }, [headerRef]);

  return (
    <header ref={headerRef} className="header" data-menu-open={String(isOpen)}>
      <a className="brand" href="#beranda" aria-label="Rame — beranda">
        <span className="brand-window">
          <img
            src="/assets/rame-logo.webp"
            width="116"
            height="37"
            alt="rame"
          />
        </span>
      </a>
      <button
        ref={toggleRef}
        className="menu-toggle"
        onClick={() => setOpen(!isOpen)}
        type="button"
        aria-label={isOpen ? "Tutup navigasi" : "Buka navigasi"}
        aria-expanded={isOpen}
        aria-controls="header-menu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
      <div
        className="header-menu"
        onClick={(event) => {
          if ((event.target as Element).closest("a, button")) setOpen(false);
        }}
        id="header-menu"
      >
        <nav ref={navRef} className="navigation" aria-label="Navigasi utama">
          <a href="#cara-beli">Cara Beli</a>
          <a className="active" href="#event" aria-current="location">
            Jelajahi Event
          </a>
          <a href="#buat-event">Buat Event</a>
          <span className="nav-indicator" aria-hidden="true"></span>
        </nav>
        <button
          className="button my-tickets"
          data-action="tickets"
          onClick={() => open({ kind: "tickets" })}
          aria-haspopup="dialog"
          aria-expanded={ticketsOpen}
          aria-label="Tiket Saya"
        >
          <svg className="icon" aria-hidden="true">
            <use href="#ticket" />
          </svg>
          <span className="ticket-label" data-animated-label aria-hidden="true">
            <AnimatedLabel text="Tiket Saya" />
          </span>
        </button>
      </div>
    </header>
  );
}

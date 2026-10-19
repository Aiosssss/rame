import { useNativeDialog } from "@/hooks/useNativeDialog";
import { Icon } from "@/components/ui/Icon";
import { exploreEvents } from "@/lib/scroll";
export function TicketDrawer({
  isOpen,
  onDismiss,
  restoreFocus,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  restoreFocus: () => void;
}) {
  const { ref, close } = useNativeDialog({
    isOpen,
    drawer: true,
    onDismiss,
    restoreFocus,
  });
  return (
    <dialog
      ref={ref}
      id="ticket-drawer"
      className="ticket-drawer"
      aria-labelledby="tickets-title"
    >
      <div className="ticket-drawer-header">
        <h2 id="tickets-title">Tiket Saya</h2>
        <button
          className="ticket-drawer-close"
          type="button"
          aria-label="Tutup tiket"
          onClick={() => void close()}
        >
          ×
        </button>
      </div>
      <div className="ticket-drawer-body">
        <ul className="ticket-list" aria-label="Daftar tiket">
          <li className="ticket-empty">
            <span className="ticket-empty-art" aria-hidden="true">
              <Icon name="ticket" />
            </span>
            <h3>Belum ada tiket tersimpan.</h3>
            <p>Temukan rencana serumu berikutnya.</p>
          </li>
        </ul>
      </div>
      <div className="ticket-drawer-footer">
        <button
          className="ticket-explore"
          type="button"
          onClick={() => void close().then(() => exploreEvents(true))}
        >
          Jelajahi Event
          <Icon name="arrow" />
        </button>
      </div>
    </dialog>
  );
}

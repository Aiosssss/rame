import { useNativeDialog } from "@/hooks/useNativeDialog";
import { info } from "@/lib/data/info";
import { exploreEvents } from "@/lib/scroll";
import { CreatorForm } from "./CreatorForm";
import { EventDetails } from "./EventDetails";
import type { DialogView } from "./types";
export function DetailDialog({
  view,
  onDismiss,
  restoreFocus,
}: {
  view: DialogView | null;
  onDismiss: () => void;
  restoreFocus: () => void;
}) {
  const { ref, close } = useNativeDialog({
    isOpen: !!view,
    onDismiss,
    restoreFocus,
  });
  const explore = () => {
    void close().then(() => exploreEvents());
  };
  return (
    <dialog ref={ref} id="detail-dialog" aria-labelledby="dialog-title">
      <button
        className="dialog-close"
        aria-label="Tutup dialog"
        onClick={() => void close()}
      >
        ×
      </button>
      <div id="dialog-content">
        {view?.kind === "event" && (
          <EventDetails event={view.event} onExplore={explore} />
        )}
        {view?.kind === "info" && (
          <>
            <h2 id="dialog-title">{info[view.key][0]}</h2>
            <p>{info[view.key][1]}</p>
          </>
        )}
        {view?.kind === "creator" && <CreatorForm />}
        {view?.kind === "tickets-mobile" && (
          <>
            <h2 id="dialog-title">Tiket Saya</h2>
            <p>Belum ada tiket tersimpan.</p>
            <p>Temukan rencana serumu berikutnya.</p>
            <button className="dialog-button" data-close onClick={explore}>
              Jelajahi Event
            </button>
          </>
        )}
      </div>
    </dialog>
  );
}

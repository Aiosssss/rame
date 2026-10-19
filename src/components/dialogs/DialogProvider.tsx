import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { DialogRequest, DialogView } from "./types";
import dynamic from "next/dynamic";
const DetailDialog = dynamic(() =>
  import("./DetailDialog").then((module) => module.DetailDialog),
);
const TicketDrawer = dynamic(() =>
  import("./TicketDrawer").then((module) => module.TicketDrawer),
);
interface DialogContextValue {
  open: (request: DialogRequest) => void;
  ticketsOpen: boolean;
}
const DialogContext = createContext<DialogContextValue | null>(null);
export function useDialogs() {
  const value = useContext(DialogContext);
  if (!value) throw new Error("DialogProvider is missing");
  return value;
}
export function DialogProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<DialogView | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback((request: DialogRequest) => {
    opener.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (
      request.kind === "tickets" &&
      !matchMedia("(min-width: 701px)").matches
    ) {
      opener.current = document.querySelector(".menu-toggle");
      setView({ kind: "tickets-mobile" });
    } else setView(request);
  }, []);
  const dismiss = useCallback(() => setView(null), []);
  const restoreFocus = useCallback(() => {
    const target =
      opener.current?.matches(".my-tickets") &&
      !matchMedia("(min-width: 701px)").matches
        ? document.querySelector<HTMLElement>(".menu-toggle")
        : opener.current;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }, []);
  const context = useMemo(
    () => ({
      open,
      ticketsOpen: view?.kind === "tickets" || view?.kind === "tickets-mobile",
    }),
    [open, view],
  );
  return (
    <DialogContext.Provider value={context}>
      {children}
      {view?.kind === "tickets" && (
        <TicketDrawer
          isOpen={true}
          onDismiss={dismiss}
          restoreFocus={restoreFocus}
        />
      )}
      {view && view.kind !== "tickets" && (
        <DetailDialog
          view={view}
          onDismiss={dismiss}
          restoreFocus={restoreFocus}
        />
      )}
    </DialogContext.Provider>
  );
}

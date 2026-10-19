import { useCallback, useEffect, useRef } from "react";
interface ModalOptions {
  isOpen: boolean;
  drawer?: boolean;
  onDismiss: () => void;
  restoreFocus: () => void;
}
export function useNativeDialog({
  isOpen,
  drawer = false,
  onDismiss,
  restoreFocus,
}: ModalOptions) {
  const ref = useRef<HTMLDialogElement>(null);
  const animation = useRef<Animation | null>(null);
  const closing = useRef<Promise<void> | null>(null);
  const close = useCallback(
    (instant = false): Promise<void> => {
      const dialog = ref.current;
      if (!dialog?.open) return Promise.resolve();
      if (closing.current) {
        if (instant) animation.current?.finish();
        return closing.current;
      }
      const closed = new Promise<void>((resolve) =>
        dialog.addEventListener("close", () => resolve(), { once: true }),
      );
      closing.current = closed;
      if (
        !drawer ||
        instant ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        dialog.close();
        return closed;
      }
      const from = getComputedStyle(dialog).transform;
      animation.current?.cancel();
      animation.current = dialog.animate(
        [{ transform: from }, { transform: "translate3d(100%,0,0)" }],
        { duration: 240, easing: "cubic-bezier(.4,0,.8,.2)" },
      );
      animation.current.finished
        .catch(() => {})
        .then(() => {
          if (dialog.open) dialog.close();
        });
      return closed;
    },
    [drawer],
  );
  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;
    const controller = new AbortController();
    const options = { signal: controller.signal };
    const body = document.body;
    const saved = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    if (drawer)
      body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + window.innerWidth - document.documentElement.clientWidth}px`;
    body.style.overflow = "hidden";
    dialog.showModal();
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (drawer && !preference.matches)
      animation.current = dialog.animate(
        [
          { transform: "translate3d(100%,0,0)" },
          { transform: "translate3d(0,0,0)" },
        ],
        { duration: 360, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    const restore = () => {
      animation.current?.cancel();
      animation.current = null;
      closing.current = null;
      body.style.overflow = saved.overflow;
      body.style.paddingRight = saved.paddingRight;
    };
    dialog.addEventListener(
      "close",
      () => {
        if (dialog.open) return;
        restore();
        onDismiss();
        restoreFocus();
      },
      options,
    );
    dialog.addEventListener(
      "cancel",
      (event) => {
        event.preventDefault();
        void close();
      },
      options,
    );
    dialog.addEventListener(
      "click",
      (event) => {
        if (event.target !== dialog) return;
        const box = dialog.getBoundingClientRect();
        if (
          event.clientX < box.left ||
          event.clientX > box.right ||
          (!drawer && (event.clientY < box.top || event.clientY > box.bottom))
        )
          void close();
      },
      options,
    );
    preference.addEventListener(
      "change",
      () => {
        if (preference.matches) animation.current?.finish();
      },
      options,
    );
    if (drawer) {
      const desktop = matchMedia("(min-width: 701px)");
      desktop.addEventListener(
        "change",
        () => {
          if (!desktop.matches) void close(true);
        },
        options,
      );
    }
    return () => {
      controller.abort();
      restore();
      if (dialog.open) dialog.close();
    };
  }, [isOpen, drawer, close, onDismiss, restoreFocus]);
  return { ref, close };
}

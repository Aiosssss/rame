/** Defer offscreen setup without deferring content, focus, or entrance playback. */
export function whenNear(target: HTMLElement, setup: () => () => void) {
  let cleanup: (() => void) | undefined;
  let observer: IntersectionObserver | undefined;
  let active = true;
  const start = () => {
    if (!active || cleanup) return;
    observer?.disconnect();
    cleanup = setup();
  };
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
      },
      { rootMargin: "600px" },
    );
    observer.observe(target);
    target.addEventListener("focusin", start);
    target.addEventListener("pointerdown", start);
  } else start();
  return () => {
    active = false;
    observer?.disconnect();
    target.removeEventListener("focusin", start);
    target.removeEventListener("pointerdown", start);
    cleanup?.();
  };
}

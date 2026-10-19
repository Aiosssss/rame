import { MotionScope } from "./scope";
interface RevealOptions {
  target: HTMLElement;
  observed?: HTMLElement;
  attribute: "entrance" | "reveal";
  threshold: number;
  margin?: string;
  duration?: number;
  endAnimation?: string;
  finishOnFocus?: boolean;
}
/** Native CSS entrances keep the original choreography and run once. */
export function setupReveal({
  target,
  observed = target,
  attribute,
  threshold,
  margin,
  duration,
  endAnimation,
  finishOnFocus,
}: RevealOptions) {
  const scope = new MotionScope();
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let observer: IntersectionObserver | undefined;
  const finish = () => {
    target.dataset[attribute] = "done";
    observer?.disconnect();
  };
  if (preference.matches || !("IntersectionObserver" in window)) {
    finish();
    return scope.dispose;
  }
  target.dataset[attribute] = "ready";
  observer = scope.observer(
    new IntersectionObserver(
      (entries) => {
        if (
          !entries.some(
            (entry) =>
              entry.isIntersecting && entry.intersectionRatio >= threshold,
          )
        )
          return;
        target.dataset[attribute] = "playing";
        observer?.disconnect();
        if (duration) scope.timeout(finish, duration);
      },
      { threshold, rootMargin: margin || "0px" },
    ),
  );
  if (endAnimation)
    scope.listen(target, "animationend", (event) => {
      if (event.animationName === endAnimation) finish();
    });
  if (finishOnFocus) scope.listen(target, "focusin", finish);
  scope.listen(preference, "change", () => {
    if (preference.matches) finish();
  });
  observer.observe(observed);
  return scope.dispose;
}

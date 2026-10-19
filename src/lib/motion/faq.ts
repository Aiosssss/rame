import { MotionScope, query, queryAll } from "./scope";
export function setupFaqMotion(section: HTMLElement) {
  const scope = new MotionScope();
  const copy = query(section, ".faq-copy");
  const rows = queryAll<HTMLDetailsElement>(section, "details");
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let observer: IntersectionObserver | undefined;
  const finish = (element: HTMLElement) => {
    element.dataset.reveal = "done";
    observer?.unobserve(element);
  };
  const targets = [copy, ...rows];
  if (!preference.matches && "IntersectionObserver" in window) {
    observer = scope.observer(
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.12) return;
            (entry.target as HTMLElement).dataset.reveal = "playing";
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -20px 0px" },
      ),
    );
    targets.forEach((element, index) => {
      element.style.setProperty(
        "--faq-delay",
        `${(Math.max(0, index - 1) % 3) * 65}ms`,
      );
      element.dataset.reveal = "ready";
      observer!.observe(element);
    });
  } else targets.forEach(finish);
  scope.listen(copy, "animationend", (event) => {
    if (
      event.animationName === "faq-title-arrive" &&
      (event.target as Element).closest(".faq-heading-blue")
    )
      finish(copy);
  });
  rows.forEach((row) => {
    scope.listen(row, "animationend", (event) => {
      if (event.target === row && event.animationName === "faq-row-arrive")
        finish(row);
    });
    scope.listen(row, "focusin", () => finish(row));
  });
  scope.listen(preference, "change", () => {
    if (preference.matches) {
      targets.forEach(finish);
      observer?.disconnect();
    }
  });
  return scope.dispose;
}

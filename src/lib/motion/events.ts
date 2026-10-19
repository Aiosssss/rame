import { MotionScope, query, queryAll } from "./scope";
export function setupEventHeading(heading: HTMLElement) {
  const scope = new MotionScope();
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let observer: IntersectionObserver | undefined;
  const finish = () => {
    heading.dataset.reveal = "done";
    observer?.disconnect();
  };
  if (preference.matches || !("IntersectionObserver" in window)) {
    finish();
    return scope.dispose;
  }
  heading.dataset.reveal = "ready";
  observer = scope.observer(
    new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          heading.dataset.reveal = "playing";
          observer?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
    ),
  );
  scope.listen(heading, "animationend", (event) => {
    if (event.target === heading.lastElementChild?.firstElementChild) finish();
  });
  scope.listen(preference, "change", () => {
    if (preference.matches) finish();
  });
  observer.observe(heading);
  return scope.dispose;
}
export function setupEventCards(page: HTMLElement | null) {
  const scope = new MotionScope();
  if (!page) return scope.dispose;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const cards = queryAll(page, ".event-card");
  let observer: IntersectionObserver | undefined;
  const finish = (card: HTMLElement) => {
    card.dataset.reveal = "done";
    query(card, ".price").dataset.reveal = "done";
    observer?.unobserve(card);
  };
  if (!preference.matches && "IntersectionObserver" in window) {
    observer = scope.observer(
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).dataset.reveal = "playing";
            query(entry.target, ".price").dataset.reveal = "playing";
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
      ),
    );
  }
  cards.forEach((card, index) => {
    const price = query(card, ".price");
    scope.listen(card, "animationend", (event) => {
      if (event.target === card) card.dataset.reveal = "done";
      if (event.target === price) price.dataset.reveal = "done";
    });
    scope.listen(card, "focusin", () => finish(card));
    if (!observer) return finish(card);
    card.style.setProperty("--event-delay", `${(index % 3) * 45}ms`);
    card.dataset.reveal = "ready";
    price.dataset.reveal = "ready";
    observer.observe(card);
  });
  scope.listen(preference, "change", () => {
    if (preference.matches) cards.forEach(finish);
  });
  scope.add(() => cards.forEach(finish));
  return scope.dispose;
}

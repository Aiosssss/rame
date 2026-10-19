export function exploreEvents(focusSearch = false) {
  if (focusSearch)
    document
      .querySelector<HTMLInputElement>("#event-search")
      ?.focus({ preventScroll: true });
  document.querySelector("#event")?.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}

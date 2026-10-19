import { MotionScope, query, queryAll } from "./scope";
export function setupNavigationIndicator(root: HTMLElement) {
  const nav = root;
  const scope = new MotionScope();
  const links = queryAll<HTMLAnchorElement>(nav, "a");
  const indicator = query(nav, ".nav-indicator");
  const desktop = matchMedia("(min-width: 701px)");
  let hovered: HTMLAnchorElement | null = null;
  function restingLink() {
    return (
      links.find((link) => link === document.activeElement) ||
      links.find((link) => link.classList.contains("active")) ||
      links[0]
    );
  }
  function position(link = hovered || restingLink()) {
    if (!desktop.matches) return;
    const bounds = link.getBoundingClientRect();
    const parent = nav.getBoundingClientRect();
    const lineWidth = indicator.offsetWidth;
    const centered = bounds.left - parent.left + (bounds.width - lineWidth) / 2;
    const x = Math.max(0, Math.min(parent.width - lineWidth, centered));
    indicator.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    nav.dataset.indicatorReady = "true";
  }
  function activate(link: HTMLAnchorElement) {
    links.forEach((item) => {
      item.classList.toggle("active", item === link);
      if (item === link) item.setAttribute("aria-current", "location");
      else item.removeAttribute("aria-current");
    });
    position(link);
  }
  links.forEach((link) => {
    scope.listen(link, "pointerenter", () => {
      hovered = link;
      position(link);
    });
    scope.listen(link, "focus", () => position(link));
    scope.listen(link, "click", () => activate(link));
  });
  scope.listen(nav, "pointerleave", () => {
    hovered = null;
    position();
  });
  scope.listen(nav, "focusout", () => scope.frame(() => position()));
  function syncHash() {
    const link = links.find((item) => item.hash === location.hash);
    if (link) activate(link);
  }
  scope.listen(window, "hashchange", syncHash);
  scope.listen(desktop, "change", () => {
    hovered = null;
    position();
  });
  scope.observer(new ResizeObserver(() => position())).observe(nav);
  document.fonts.ready.then(() => {
    if (scope.active) {
      syncHash();
      position();
    }
  });
  return scope.dispose;
}

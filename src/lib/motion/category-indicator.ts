import { MotionScope, query, queryAll } from "./scope";
export function setupCategoryIndicator(root: HTMLElement) {
  const group = root;
  const scope = new MotionScope();
  const filters = queryAll<HTMLButtonElement>(root, "button");
  const indicator = query(group, ".filter-indicator");
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = matchMedia("(hover: hover) and (pointer: fine)");
  let hovered: HTMLButtonElement | null = null;
  let animation: Animation | undefined;
  function resting() {
    return (
      filters.find((button) => button === document.activeElement) ||
      filters.find((button) => button.classList.contains("selected")) ||
      filters[0]
    );
  }
  function move(button = hovered || resting(), animate = true) {
    const parent = group.getBoundingClientRect();
    const target = button.getBoundingClientRect();
    const current = indicator.getBoundingClientRect();
    const x = target.left - parent.left;
    const y = target.top - parent.top;
    const fromX = current.left - parent.left;
    const fromY = current.top - parent.top;
    const width = target.width;
    const ready = group.dataset.indicatorReady === "true";
    animation?.cancel();
    filters.forEach((item) =>
      item.classList.toggle("indicator-target", item === button),
    );
    indicator.style.width = `${width}px`;
    indicator.style.height = `${target.height}px`;
    const final = `translate3d(${x}px,${y}px,0)`;
    indicator.style.transform = final;
    group.dataset.indicatorReady = "true";
    if (
      !animate ||
      !ready ||
      preference.matches ||
      (Math.abs(x - fromX) < 0.5 && Math.abs(y - fromY) < 0.5)
    )
      return;
    const direction = x >= fromX ? 1 : -1;
    animation = scope.animation(
      indicator.animate(
        [
          {
            transform: `translate3d(${fromX}px,${fromY}px,0) scaleX(${current.width / width})`,
            offset: 0,
          },
          {
            transform: `translate3d(${fromX + (x - fromX) * 0.72}px,${fromY + (y - fromY) * 0.72}px,0) skewX(${-direction * 16}deg) scaleX(1.12)`,
            offset: 0.42,
          },
          {
            transform: `translate3d(${x + direction * 2}px,${y}px,0) skewX(${direction * 5}deg) scaleX(.98)`,
            offset: 0.78,
          },
          { transform: final, offset: 1 },
        ],
        { duration: 500, easing: "cubic-bezier(.22,.8,.28,1)" },
      ),
    );
  }
  filters.forEach((button) => {
    scope.listen(button, "pointerenter", () => {
      if (!pointer.matches) return;
      hovered = button;
      move(button);
    });
    scope.listen(button, "focus", () => move(button));
    scope.listen(button, "click", () => move(button));
  });
  scope.listen(group, "pointerleave", () => {
    hovered = null;
    move(resting());
  });
  scope.listen(group, "focusout", () =>
    scope.frame(() => {
      if (!hovered) move(resting());
    }),
  );
  scope.listen(preference, "change", () => move(hovered || resting(), false));
  scope
    .observer(new ResizeObserver(() => move(hovered || resting(), false)))
    .observe(group);
  document.fonts.ready.then(() => {
    if (scope.active) move(hovered || resting(), false);
  });
  move(resting(), false);
  return {
    dispose: scope.dispose,
    refresh: () => {
      const target = hovered || resting();
      filters.forEach((item) =>
        item.classList.toggle("indicator-target", item === target),
      );
    },
  };
}

import { MotionScope, query, queryAll } from "./scope";
interface AccordionState {
  item: HTMLDetailsElement;
  summary: HTMLElement;
  answer: HTMLElement;
  expanded: boolean;
  heightAnimation: Animation | null;
  answerAnimation: Animation | null;
}
export function setupFaqAccordion(section: HTMLElement) {
  const scope = new MotionScope();
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const states: AccordionState[] = queryAll<HTMLDetailsElement>(
    section,
    "details",
  ).map((item) => ({
    item,
    summary: query(item, "summary"),
    answer: query(item, ".faq-answer"),
    expanded: item.open,
    heightAnimation: null,
    answerAnimation: null,
  }));
  function settle(state: AccordionState) {
    state.item.open = state.expanded;
    state.heightAnimation?.cancel();
    state.answerAnimation?.cancel();
    state.heightAnimation = state.answerAnimation = null;
    state.item.style.removeProperty("overflow");
    state.summary.removeAttribute("aria-expanded");
  }
  function setExpanded(state: AccordionState, expanded: boolean) {
    const from = state.item.getBoundingClientRect().height;
    const currentAnswer = state.answerAnimation
      ? {
          opacity: getComputedStyle(state.answer).opacity,
          transform: getComputedStyle(state.answer).transform,
        }
      : {
          opacity: expanded ? 0 : 1,
          transform: expanded ? "translateY(-6px)" : "none",
        };
    state.heightAnimation?.cancel();
    state.answerAnimation?.cancel();
    state.expanded = expanded;
    state.item.dataset.expanded = String(expanded);
    state.summary.setAttribute("aria-expanded", String(expanded));
    if (preference.matches || typeof state.item.animate !== "function")
      return settle(state);
    state.item.open = true;
    const borders = state.item.offsetHeight - state.item.clientHeight;
    const to = expanded
      ? state.item.offsetHeight
      : state.summary.offsetHeight + borders;
    state.item.style.overflow = "hidden";
    const animation = scope.animation(
      state.item.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration: expanded ? 420 : 340,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "both",
      }),
    );
    state.heightAnimation = animation;
    state.answerAnimation = scope.animation(
      state.answer.animate(
        [
          currentAnswer,
          {
            opacity: expanded ? 1 : 0,
            transform: expanded ? "none" : "translateY(-4px)",
          },
        ],
        {
          duration: expanded ? 300 : 220,
          delay: expanded ? 45 : 0,
          easing: "ease-out",
          fill: "both",
        },
      ),
    );
    animation.finished
      .then(() => {
        if (scope.active && state.heightAnimation === animation) settle(state);
      })
      .catch(() => {});
  }
  states.forEach((state) => {
    state.item.removeAttribute("name");
    state.item.dataset.expanded = String(state.expanded);
    scope.listen(state.summary, "click", (event) => {
      event.preventDefault();
      state.item.dataset.reveal = "done";
      const expanded = !state.expanded;
      if (expanded)
        states.forEach((other) => {
          if (other !== state && other.expanded) setExpanded(other, false);
        });
      setExpanded(state, expanded);
    });
  });
  scope.listen(preference, "change", () => {
    if (preference.matches) states.forEach(settle);
  });
  scope.add(() => states.forEach(settle));
  return scope.dispose;
}

import { useEffect, useLayoutEffect, useRef, useState } from "react";
export function useEventPagination(filterKey: string, pageCount: number) {
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<Animation | null>(null);
  // Store the filter key with the current page, so filtering resets before render.
  const [previousKey, setPreviousKey] = useState(filterKey);
  if (previousKey !== filterKey) {
    setPreviousKey(filterKey);
    setPage(0);
  }
  useEffect(() => () => animationRef.current?.cancel(), []);
  useLayoutEffect(() => {
    animationRef.current?.cancel();
  }, [filterKey]);
  const changePage = (direction: number) => {
    const target = Math.max(0, Math.min(pageCount - 1, page + direction));
    const track = trackRef.current;
    if (target === page || !track) return;
    const from = getComputedStyle(track).transform;
    animationRef.current?.cancel();
    const to = `translate3d(${-target * 100}%,0,0)`;
    setPage(target);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced)
      animationRef.current = track.animate(
        [{ transform: from }, { transform: to }],
        { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    const section = sectionRef.current;
    if (section && section.getBoundingClientRect().top < 0)
      section.scrollIntoView({
        block: "start",
        behavior: reduced ? "instant" : "smooth",
      });
  };
  return { page, trackRef, sectionRef, changePage };
}

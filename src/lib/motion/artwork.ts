import { loadDeferredImage } from "@/lib/deferred-images";
import { artworkProfiles } from "./artwork-profiles";
import { artworkFrames } from "./artwork-frames";
import { MotionScope } from "./scope";

export function setupArtworkMotion(root: HTMLElement) {
  const scope = new MotionScope();
  for (const profile of artworkProfiles) {
    const frame = root.querySelector<HTMLElement>(profile.selector);
    const image = frame?.querySelector("img");
    if (!frame || !image) continue;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let animation: Animation | undefined;
    let started = false;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      frame.dataset.artMotion = "done";
      animation?.cancel();
      observer?.disconnect();
    };
    scope.listen(preference, "change", () => {
      if (preference.matches) finish();
    });
    if (
      preference.matches ||
      typeof image.animate !== "function" ||
      !("IntersectionObserver" in window)
    ) {
      finish();
      continue;
    }
    const play = () => {
      if (started || finished) return;
      started = true;
      observer?.disconnect();
      loadDeferredImage(image);
      image
        .decode()
        .catch(() => {})
        .then(() => {
          if (!scope.active || finished) return;
          frame.dataset.artMotion = "playing";
          animation = scope.animation(
            image.animate(artworkFrames(profile), {
              duration: profile.duration,
              delay: profile.delay,
              easing: "linear",
              fill: "backwards",
              iterations: 1,
            }),
          );
          animation.finished.then(finish, finish);
        });
    };
    observer = scope.observer(
      new IntersectionObserver(
        (entries) => {
          if (
            entries.some(
              (entry) =>
                entry.isIntersecting && entry.intersectionRatio >= 0.18,
            )
          )
            play();
        },
        { threshold: 0.18, rootMargin: "0px 0px -16px 0px" },
      ),
    );
    frame.dataset.artMotion = "ready";
    observer.observe(frame);
  }
  return scope.dispose;
}

import { heroProfiles } from "./hero-profiles";
import { MotionScope, query, queryAll, springRemainder } from "./scope";
export function setupHeroMotion(hero: HTMLElement) {
  const scope = new MotionScope();
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  hero.dataset.artReady = "false";
  if (motionPreference.matches) {
    hero.dataset.artReady = "true";
    return scope.dispose;
  }
  function prepareArtwork() {
    if (motionPreference.matches) return () => {};
    const compact = matchMedia("(max-width: 700px)").matches;
    const steps = compact ? 48 : 64;
    const travel = Math.max(
      0.5,
      Math.min(1.25, query(hero, ".hero-stage").clientWidth / 1000),
    );

    const prepared: {
      image: HTMLImageElement;
      frames: Keyframe[];
      duration: number;
      delay: number;
    }[] = [];
    for (const object of heroProfiles) {
      const image = hero.querySelector<HTMLImageElement>(
        ".hero-" + object.name,
      );
      if (!image || typeof image.animate !== "function") continue;
      const frames: Keyframe[] = [];
      for (let step = 0; step <= steps; step++) {
        const t = step / steps;
        if (step === steps) {
          frames.push({ offset: 1, opacity: 1, transform: "none" });
          continue;
        }
        const remaining = springRemainder(t, object.damping, object.frequency);
        const progress = 1 - remaining;
        const arc = 4 * progress * (1 - progress);
        const x = (object.x * remaining + object.arcX * arc) * travel;
        const y = (object.y * remaining + object.arcY * arc) * travel;
        // Angular inertia settles later than translation, like a suspended object.
        const angular = springRemainder(t, 6.6, object.frequency * 0.78);
        const scale = 1 - (1 - object.scale) * springRemainder(t, 7.8, 7.2);
        const fade = Math.min(t / 0.16, 1);
        const roll = (object.roll * angular).toFixed(3);
        // The same curved motion uses a simpler 2D transform on small screens.
        const transform = compact
          ? `translate(${x.toFixed(3)}px,${y.toFixed(3)}px) rotate(${roll}deg) scale(${scale.toFixed(5)})`
          : `translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,0) perspective(900px) rotateX(${(object.pitch * angular).toFixed(3)}deg) rotateY(${(object.yaw * angular).toFixed(3)}deg) rotateZ(${roll}deg) scale(${scale.toFixed(5)})`;
        frames.push({
          offset: t,
          opacity: fade * fade * (3 - 2 * fade),
          transform,
        });
      }
      prepared.push({
        image,
        frames,
        duration: object.duration,
        delay: object.delay,
      });
    }
    // Prepare the trajectories before the first animation frame, then hand playback
    // to the browser so JavaScript does no work while the objects move.
    return () => {
      if (!scope.active || motionPreference.matches) return;
      const animations = prepared.map(({ image, frames, duration, delay }) =>
        scope.animation(
          image.animate(frames, {
            duration,
            delay,
            easing: "linear",
            fill: "backwards",
            iterations: 1,
          }),
        ),
      );
      const stopForReducedMotion = () => {
        if (motionPreference.matches)
          animations.forEach((animation) => animation.cancel());
      };
      scope.listen(motionPreference, "change", stopForReducedMotion);
      Promise.allSettled(
        animations.map((animation) => animation.finished),
      ).then(() => {
        animations.forEach((animation) => animation.cancel());
        motionPreference.removeEventListener("change", stopForReducedMotion);
      });
    };
  }

  let started = false;
  const showHero = () => {
    if (!scope.active || started) return;
    started = true;
    clearTimeout(fallback);
    const playArtwork = prepareArtwork();
    scope.frame(() => {
      hero.dataset.artReady = "true";
      playArtwork();
    });
  };
  const fallback = scope.timeout(showHero, 1800);
  const artwork = queryAll<HTMLImageElement>(hero, "img").map((image) =>
    image.decode(),
  );
  Promise.allSettled([document.fonts.ready, ...artwork]).then(showHero);
  return scope.dispose;
}

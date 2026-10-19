import type { ArtworkProfile } from "./artwork-profiles";
import { springRemainder } from "./scope";
export function artworkFrames(profile: ArtworkProfile) {
  const compact = matchMedia("(max-width: 700px)").matches;
  const samples = compact ? 32 : 48;
  const amplitude = compact ? 0.78 : 1;
  const frames: Keyframe[] = [];
  if (profile.mode === "announce") {
    const pose = (
      x: number,
      y: number,
      turn: number,
      roll: number,
      scale: number,
    ) =>
      `translate3d(${x * amplitude}%,${y * amplitude}%,0) perspective(900px) rotateY(${turn * amplitude}deg) rotateZ(${roll * amplitude}deg) scale(${1 + (scale - 1) * amplitude})`;
    // Raise from the grip, give two small announcement gestures, then rest.
    frames.push(
      {
        offset: 0,
        opacity: 0,
        transform: pose(18, 12, -46, 20, 0.88),
        easing: "cubic-bezier(.16,1,.3,1)",
      },
      {
        offset: 0.3,
        opacity: 1,
        transform: pose(0, -2, 10, -9, 1.015),
        easing: "cubic-bezier(.45,0,.2,1)",
      },
      {
        offset: 0.47,
        opacity: 1,
        transform: pose(0, 0, -4, 2, 1),
        easing: "ease-in-out",
      },
      {
        offset: 0.58,
        opacity: 1,
        transform: pose(-1, 0, 1, -4, 1.025),
        easing: "ease-in-out",
      },
      {
        offset: 0.68,
        opacity: 1,
        transform: pose(1, 0.5, -2, 3, 0.997),
        easing: "ease-in-out",
      },
      {
        offset: 0.8,
        opacity: 1,
        transform: pose(-0.5, 0, 1, -1.5, 1.008),
        easing: "ease-in-out",
      },
      { offset: 1, opacity: 1, transform: "none" },
    );
  } else
    for (let index = 0; index <= samples; index++) {
      const t = index / samples;
      if (index === samples) {
        frames.push({ offset: 1, opacity: 1, transform: "none" });
        continue;
      }
      const u = 1 - springRemainder(t, profile.damping, profile.frequency);
      const v = 1 - u;
      const x =
        (v ** 3 * profile.from[0] +
          3 * v * v * u * profile.bend[0] +
          3 * v * u * u * profile.bend[2]) *
        amplitude;
      const y =
        (v ** 3 * profile.from[1] +
          3 * v * v * u * profile.bend[1] +
          3 * v * u * u * profile.bend[3]) *
        amplitude;
      const angular = springRemainder(t, 6.4, profile.frequency * 0.83);
      const roll =
        (profile.roll * angular + profile.bank * 4 * u * (1 - u)) * amplitude;
      const scale = 1 - (1 - profile.scale) * springRemainder(t, 7.5, 7.2);
      const fade = Math.min(1, t / 0.17);
      frames.push({
        offset: t,
        opacity: fade * fade * (3 - 2 * fade),
        transform: `translate3d(${x.toFixed(3)}%,${y.toFixed(3)}%,0) perspective(720px) rotateX(${(profile.pitch * angular * amplitude).toFixed(3)}deg) rotateY(${(profile.yaw * angular * amplitude).toFixed(3)}deg) rotateZ(${roll.toFixed(3)}deg) scale(${scale.toFixed(5)})`,
      });
    }

  return frames;
}

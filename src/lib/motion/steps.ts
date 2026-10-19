import { setupReveal } from "./reveal";
export function setupStepsMotion(section: HTMLElement) {
  return setupReveal({
    target: section,
    attribute: "entrance",
    threshold: 0.12,
    margin: "0px 0px -24px 0px",
    duration: 1700,
  });
}

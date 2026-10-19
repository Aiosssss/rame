import { query } from "./scope";
import { setupReveal } from "./reveal";
export function setupCreatorMotion(section: HTMLElement) {
  return setupReveal({
    target: query(section, ".creator-copy"),
    attribute: "entrance",
    threshold: 0.15,
    margin: "0px 0px -16px 0px",
    endAnimation: "creator-action-arrive",
    finishOnFocus: true,
  });
}

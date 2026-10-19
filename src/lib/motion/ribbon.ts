import { query } from "./scope";
import { setupReveal } from "./reveal";
export function setupRibbonMotion(shell: HTMLElement) {
  return setupReveal({
    target: query(shell, ".ribbon"),
    observed: shell,
    attribute: "entrance",
    threshold: 0.1,
    endAnimation: "ribbon-arrive",
  });
}

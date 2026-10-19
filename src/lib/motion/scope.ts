/** Own native listeners, observers and playback for one React effect. */
type ScopeEventMap = HTMLElementEventMap & WindowEventMap;
export class MotionScope {
  active = true;
  private abort = new AbortController();
  private cleanups: (() => void)[] = [];
  add(cleanup: () => void) {
    this.cleanups.push(cleanup);
  }
  listen<K extends keyof ScopeEventMap>(
    target: EventTarget,
    type: K,
    listener: (event: ScopeEventMap[K]) => void,
  ) {
    target.addEventListener(type, listener as EventListener, {
      signal: this.abort.signal,
    });
  }
  observer<T extends IntersectionObserver | ResizeObserver>(observer: T): T {
    this.add(() => observer.disconnect());
    return observer;
  }
  animation(animation: Animation): Animation {
    this.add(() => animation.cancel());
    return animation;
  }
  timeout(callback: () => void, delay: number) {
    const id = window.setTimeout(() => {
      if (this.active) callback();
    }, delay);
    this.add(() => clearTimeout(id));
    return id;
  }
  frame(callback: () => void) {
    const id = requestAnimationFrame(() => {
      if (this.active) callback();
    });
    this.add(() => cancelAnimationFrame(id));
  }
  dispose = () => {
    this.active = false;
    this.abort.abort();
    this.cleanups.forEach((cleanup) => cleanup());
  };
}
export function query<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Missing Rame element: ${selector}`);
  return element;
}
export function queryAll<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}
export function springRemainder(t: number, damping: number, frequency: number) {
  return (
    Math.exp(-damping * t) *
    (Math.cos(frequency * t) + (damping / frequency) * Math.sin(frequency * t))
  );
}

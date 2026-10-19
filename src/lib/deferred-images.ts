/** Start downloads close to the viewport, before an entrance can become visible. */
let observer: IntersectionObserver | undefined;

export function loadDeferredImage(image: HTMLImageElement) {
  if (image.hasAttribute("src") || !image.dataset.src) return;
  image.loading = "eager";
  if (image.dataset.srcset) image.srcset = image.dataset.srcset;
  image.src = image.dataset.src;
}

export function observeDeferredImage(image: HTMLImageElement) {
  if (!("IntersectionObserver" in window)) {
    loadDeferredImage(image);
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        loadDeferredImage(entry.target as HTMLImageElement);
        observer!.unobserve(entry.target);
      }
    },
    { rootMargin: "600px" },
  );
  observer.observe(image);
  return () => observer?.unobserve(image);
}

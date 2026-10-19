import { useEffect, useRef, useState } from "react";
export function useMobileMenu() {
  const [isOpen, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    const mobile = matchMedia("(max-width: 700px)");
    document.addEventListener(
      "click",
      (event) => {
        if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
      },
      options,
    );
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape")
          setOpen((open) => {
            if (open) toggleRef.current?.focus();
            return false;
          });
      },
      options,
    );
    mobile.addEventListener("change", () => setOpen(false), options);
    return () => controller.abort();
  }, []);
  return { isOpen, setOpen, headerRef, toggleRef };
}

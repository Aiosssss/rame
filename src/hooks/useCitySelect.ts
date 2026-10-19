import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { cities } from "@/lib/data/events";
export function useCitySelect(
  value: string,
  onChange: (value: string) => void,
) {
  const [isOpen, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const fieldRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const typeahead = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const selected = cities.findIndex((city) => city.value === value);
  const close = () => {
    setOpen(false);
    typeahead.current = "";
    clearTimeout(timer.current);
  };
  const open = () => {
    setOpen(true);
    setActive(selected);
  };
  const choose = (index: number) => {
    onChange(cities[index].value);
    close();
    triggerRef.current?.focus({ preventScroll: true });
  };
  const highlight = (index: number) => {
    const next = (index + cities.length) % cities.length;
    setActive(next);
    document
      .getElementById(`city-option-${next}`)
      ?.scrollIntoView({ block: "nearest" });
  };
  useEffect(() => {
    const handleOutside = (event: PointerEvent) => {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setOpen(false);
        typeahead.current = "";
        clearTimeout(timer.current);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      clearTimeout(timer.current);
    };
  }, []);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const key = event.key;
    if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) open();
      else highlight(active + (key === "ArrowDown" ? 1 : -1));
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      if (isOpen) choose(active);
      else open();
    } else if (key === "Escape" && isOpen) {
      event.preventDefault();
      close();
    } else if ((key === "Home" || key === "End") && isOpen) {
      event.preventDefault();
      highlight(key === "Home" ? 0 : cities.length - 1);
    } else if (key === "Tab") close();
    else if (
      key.length === 1 &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      if (!isOpen) open();
      typeahead.current += key.toLocaleLowerCase("id");
      const index = cities.findIndex((city) =>
        city.label.toLocaleLowerCase("id").startsWith(typeahead.current),
      );
      if (index >= 0) highlight(index);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        typeahead.current = "";
      }, 650);
    }
  };
  return {
    isOpen,
    active,
    selected,
    fieldRef,
    triggerRef,
    close,
    open,
    choose,
    setActive,
    onKeyDown,
  };
}

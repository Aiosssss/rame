import { whenNear } from "@/lib/when-near";
import { useEffect, useRef } from "react";
import { categories } from "@/lib/data/events";
import { setupCategoryIndicator } from "@/lib/motion/category-indicator";
export function CategoryFilters({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useRef<ReturnType<typeof setupCategoryIndicator> | null>(null);
  useEffect(() => {
    return whenNear(ref.current!, () => {
      const controller = setupCategoryIndicator(ref.current!);
      motion.current = controller;
      return () => {
        controller.dispose();
        motion.current = null;
      };
    });
  }, []);
  useEffect(() => {
    motion.current?.refresh();
  }, [value]);
  return (
    <div ref={ref} className="filters" role="group" aria-label="Kategori event">
      <span className="filter-indicator" aria-hidden="true" />
      {categories.map((label, index) => {
        const category = index === 0 ? "all" : label;
        return (
          <button
            key={category}
            className={value === category ? "selected" : undefined}
            data-category={category}
            aria-pressed={value === category}
            onClick={() => onChange(category)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

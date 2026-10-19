import type { CSSProperties } from "react";
export function AnimatedLabel({
  text,
  offset = 0,
}: {
  text: string;
  offset?: number;
}) {
  return Array.from(text).map((letter, index) => (
    <span
      key={index}
      className="button-char"
      data-char={letter}
      style={{ "--letter": offset + index } as CSSProperties}
    >
      <span>{letter}</span>
    </span>
  ));
}

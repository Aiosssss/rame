import { useEffect, useRef, type ImgHTMLAttributes } from "react";
import { observeDeferredImage } from "@/lib/deferred-images";

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string };

export function DeferredImage({ src, srcSet, ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => observeDeferredImage(ref.current!), []);
  return (
    <>
      <img ref={ref} {...props} data-src={src} data-srcset={srcSet} />
      <noscript>
        <img {...props} src={src} srcSet={srcSet} />
      </noscript>
    </>
  );
}

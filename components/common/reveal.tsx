"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades content up as it scrolls into view (design.md §8).
 * `stagger` animates direct children in sequence instead of the block.
 * Reduced motion and no-JS are handled in globals.css.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Never risk leaving content invisible. Reduced motion and no-JS already
    // force opacity:1 in globals.css, so only a missing observer needs a net —
    // set via the DOM rather than state to avoid a cascading render.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(stagger ? "be-stagger" : "be-reveal", shown && "is-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

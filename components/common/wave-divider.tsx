import { cn } from "@/lib/utils";

/**
 * Signature ocean-wave section divider. Sits at the bottom edge of a section and
 * visually pours into the next one. `fill` should match the *next* section's
 * background color (a token color name, e.g. "text-mist" / "text-white").
 * Decorative only.
 */
export function WaveDivider({
  className,
  fill = "text-white",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none w-full leading-[0]",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={cn("block h-[48px] w-full sm:h-[70px]", fill)}
        fill="currentColor"
      >
        <path d="M0 48c120-28 240-42 360-30s240 54 360 60 240-24 360-42 240-18 360 6v48H0V48Z" />
      </svg>
    </div>
  );
}

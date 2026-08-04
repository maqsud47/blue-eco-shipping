import { cn } from "@/lib/utils";

/**
 * Signature motif: a short teal→green rule with a leaf-over-wave glyph drawn
 * from the Blu Eco Shipping & Logistics logo. Sits above each section eyebrow. Use consistently.
 */
export function HeadingRule({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-hidden="true"
    >
      <span className="h-[3px] w-9 rounded-full bg-gradient-to-r from-tide to-eco" />
      <svg viewBox="0 0 24 24" className="size-4" fill="none">
        {/* leaf */}
        <path
          d="M12 3c4.4 0 8 3.2 8 7.5 0 4-3.3 7-8 7-1 0-2-.15-2.9-.45"
          className="text-eco"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="currentColor"
          fillOpacity="0.14"
        />
        <path
          d="M12 17.5c-1.3-3.8-3.9-6-6.9-6.8"
          className="text-eco"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* wave */}
        <path
          d="M3 21c1.5-1.4 3-1.4 4.5 0S10.5 22.4 12 21s3-1.4 4.5 0 3 1.4 4.5 0"
          className="text-tide"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

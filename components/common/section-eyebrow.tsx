import { cn } from "@/lib/utils";
import { HeadingRule } from "./heading-rule";

/** Eyebrow label with the ship-star heading rule above it. */
export function SectionEyebrow({
  children,
  className,
  withRule = true,
}: {
  children: React.ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {withRule && <HeadingRule />}
      <span className="text-eyebrow font-semibold text-tide uppercase">
        {children}
      </span>
    </div>
  );
}

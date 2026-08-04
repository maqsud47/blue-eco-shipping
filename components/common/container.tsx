import { cn } from "@/lib/utils";

/** Centered page container: max-width 1200px, 24px side padding (16px mobile). */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}
      {...props}
    />
  );
}

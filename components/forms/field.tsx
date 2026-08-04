import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/** Label + control + inline error. Keeps forms compact and accessible. */
export function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={id} className="text-slate/90">
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-error text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

import * as React from "react";

import { cn } from "@/utils/classNames";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; // optional prop
  error?: string; // optional prop for validation
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div>
        {label && <label className="text-sm font-medium">{label}</label>}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

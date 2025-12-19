import * as React from "react";
import { cn } from "@/utils/classNames";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        // Base
        "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900",
        // Placeholder
        "placeholder:text-gray-400",
        // Focus (clean orange ring, NO grey border)
        "focus:ring-2 focus:ring-[#f15A24] focus:border-transparent focus:outline-none",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // File input reset
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };

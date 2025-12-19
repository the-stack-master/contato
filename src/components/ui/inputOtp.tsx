"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "@/utils/classNames";

/* ---------------- Main OTP Input ---------------- */
const InputOTP = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }

    props.onKeyDown?.(e);
  };

  const handleChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    props.onChange?.(numericValue);
  };

  return (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-3 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      inputMode="numeric"
      pattern="\d*"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...props}
    />
  );
});
InputOTP.displayName = "InputOTP";

/* ---------------- OTP Group ---------------- */
const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

/* ---------------- OTP Slot ---------------- */
const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        `
        relative
        flex h-12 w-12
        items-center justify-center
        rounded-xl
        border border-gray-300
        bg-white
        text-sm font-medium text-gray-900
        transition
        `,
        // Focus / active
        isActive && "ring-2 ring-[#f15A24] border-transparent",
        // Disabled handled by parent
        className
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px bg-gray-900 animate-caret-blink" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/* ---------------- OTP Separator ---------------- */
const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => (
  <div ref={ref} role="separator" className="text-gray-400" {...props}>
    <Dot className="w-4 h-4" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

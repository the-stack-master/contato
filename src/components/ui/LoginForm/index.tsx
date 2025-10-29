/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/classNames";
import { usePathname } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/inputOtp";
import { LogoDocument } from "@/types/commonTypes";
import Image from "next/image";
import getImageUrl from "@/utils/getImageUrl";
import { LoginPage } from "@/types/loginTypes";
import { motion } from "framer-motion";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const otpSchema = z.object({
  otp: z.string().min(6, "Please enter the complete 6-digit code").max(6),
});

type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

interface LoginFormProps {
  loginContent: LoginPage | null;
  logoData: LogoDocument | null;
}

export function LoginForm({ loginContent, logoData }: LoginFormProps) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [userEmail, setUserEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const { verifyOtp, isLoading } = useAuthActions();
  const pathname = usePathname();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const onEmailSubmit = async (data: EmailFormData) => {
    try {
      // Clear previous errors
      emailForm.clearErrors();

      setUserEmail(data.email);
      setStep("otp");
      setResendTimer(60); // 60 second timer
    } catch (error: any) {
      // Set error on email field
      emailForm.setError("email", {
        type: "server",
        message:
          error?.message ||
          "Failed to send OTP. Please check your email and try again.",
      });
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    try {
      // Clear previous errors
      otpForm.clearErrors();

      await verifyOtp(userEmail, data.otp);
      // success will navigate or do whatever is needed after verification
    } catch (error: any) {
      otpForm.setError("otp", {
        type: "server",
        message:
          error?.message || "Failed to verify OTP. Please check your code.",
      });
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setIsResending(true);
    try {
      setResendTimer(60);
    } catch {
      // optionally handle resend error gracefully
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setUserEmail("");
    setOtpValue("");
    setResendTimer(0);
    emailForm.reset();
    otpForm.reset();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return pathname === "/" ? (
    <>
      {/* Login Page Layout */}
      <div
        id="login"
        className="min-h-screen flex flex-col lg:flex-row relative"
      >
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-6 lg:p-12 bg-white lg:border-r border-gray-100 min-h-screen lg:min-h-0">
          <div className="w-full max-w-sm space-y-6 lg:space-y-8 animate-in fade-in-50 slide-in-from-left-5 duration-700">
            {/* Logo/Brand */}
            <div className="text-center space-y-2">
              <div className="mx-auto flex items-center justify-center mb-6  animate-in zoom-in-50 duration-500 delay-200 overflow-hidden">
                <Image
                  src={getImageUrl(logoData?.mainLogo?.image?.asset?.url ?? "")}
                  alt={logoData?.mainLogo?.altText || "Company Logo"}
                  width={100} // match w-16
                  height={100} // match h-16
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-300">
                {step === "email"
                  ? loginContent?.title
                  : loginContent?.otpTitle}
              </h2>
              {step === "otp" && (
                <p className="text-sm text-gray-600 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-400">
                  {loginContent?.infoText} <br />
                  <span className="font-medium text-[#f15A24]">
                    {userEmail}
                  </span>{" "}
                  <button
                    onClick={handleBackToEmail}
                    className="text-xs text-gray-500 hover:text-[#f15A24] underline transition-colors ml-1"
                  >
                    (change)
                  </button>
                </p>
              )}
            </div>

            {/* Email Form */}
            {step === "email" && (
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-6 animate-in fade-in-50 slide-in-from-left-3 duration-500 delay-700"
                noValidate
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...emailForm.register("email")}
                    className={cn(
                      "h-12 bg-white border-[#f15A24] focus:border-[#f15A24] focus:ring-[#f15A24] focus:ring-2 focus:ring-offset-0 focus:outline-none transition-all duration-200 shadow-sm text-gray-800",
                      emailForm.formState.errors.email &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="text-sm text-red-600 animate-in fade-in-50 slide-in-from-left-2 duration-300">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:from-[#d04f23] hover:to-[#f15A24] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending code...
                    </div>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            )}

            {/* OTP Form */}
            {step === "otp" && (
              <form
                onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                className="space-y-6 animate-in fade-in-50 slide-in-from-right-3 duration-500"
                noValidate
              >
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700 block text-center">
                    {loginContent?.otpLabel}
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otpValue}
                      onChange={(value) => {
                        setOtpValue(value);
                        otpForm.setValue("otp", value);
                        otpForm.clearErrors("otp");
                      }}
                    >
                      <InputOTPGroup>
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="h-14 w-12 text-lg border-[#f15A24] focus:border-[#f15A24] focus:ring-[#f15A24] focus:ring-2 focus:ring-offset-0 focus:outline-none"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {otpForm.formState.errors.otp && (
                    <p className="text-sm text-red-600 text-center animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || otpValue.length < 6}
                  className="w-full h-12 bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:from-[#d04f23] hover:to-[#f15A24] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Verify & Login"
                  )}
                </Button>

                {/* Resend OTP */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    {loginContent?.resendText}
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    {resendTimer > 0 ? (
                      <span className="text-sm text-gray-500">
                        {loginContent?.resendTimerLabel}{" "}
                        {formatTime(resendTimer)}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="text-sm text-[#f15A24] hover:text-orange-700 font-medium transition-colors underline"
                      >
                        {isResending ? "Sending..." : "Send code again"}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-600 animate-in fade-in-50 duration-500 delay-1000">
              {loginContent?.signupText}{" "}
              <a
                href="/signup"
                className="text-[#f15A24] hover:text-orange-700 font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        {/* Right Section - Graphics + Content */}
        <div className="hidden lg:flex flex-1 bg-[#FFEDE6] items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#f15A24]/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#f15A24]/15 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#f15A24]/20 rounded-full blur-xl animate-pulse delay-500"></div>
            <div className="absolute top-32 left-32 w-16 h-16 bg-[#f15A24]/30 rounded-2xl rotate-12 animate-bounce delay-300"></div>
            <div className="absolute bottom-32 right-32 w-20 h-20 bg-[#d04f23]/25 rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-1/2 right-20 w-12 h-12 bg-[#ffad87]/20 rounded-lg rotate-45 animate-bounce delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-lg text-center space-y-8">
            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-500">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                {loginContent?.heroHeading}
                <br />
                <span className="bg-gradient-to-r from-[#f15A24] to-[#d04f23] bg-clip-text text-transparent">
                  {loginContent?.heroHighlightedText}
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-md mx-auto">
                {loginContent?.heroTagline}
              </p>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#f15A24] opacity-90">
          {/* Mouse outline */}
          <div className="relative w-[28px] h-[44px] border-2 border-[#f15A24] rounded-full flex justify-center items-start">
            {/* Scroll wheel */}
            <motion.div
              className="absolute top-[8px] w-[4px] h-[8px] rounded-full bg-[#f15A24]"
              animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Down arrows */}
          <motion.div
            animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="flex flex-col items-center mt-1"
          >
            <ChevronDown className="w-3 h-3" strokeWidth={2} />
            <ChevronDown className="w-3 h-3 -mt-2" strokeWidth={2} />
          </motion.div>
        </div>
      </div>
    </>
  ) : null;
}

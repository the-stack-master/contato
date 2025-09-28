"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Users, ChevronDown } from "lucide-react";
import { cn } from "@/utils/classNames";
import Head from "next/head";
import { usePathname } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginPage {
  _id: string;
  title: string;
  heading: string;
  tagline: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: {
      asset: {
        url: string;
        metadata?: {
          lqip?: string;
          dimensions?: { width: number; height: number };
        };
      };
    };
  };
}

interface LoginFormProps {
  loginContent: LoginPage | null;
}

export function LoginForm({ loginContent }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthActions();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return pathname === "/" ? (
    <>
      {/* SEO Head */}
      {loginContent && (
        <Head>
          <title>{loginContent.seo?.metaTitle || loginContent.title}</title>
          <meta
            name="description"
            content={loginContent.seo?.metaDescription || loginContent.tagline}
          />
          {loginContent.seo?.openGraphImage?.asset?.url && (
            <>
              <meta
                property="og:title"
                content={loginContent.seo.metaTitle || loginContent.title}
              />
              <meta
                property="og:description"
                content={
                  loginContent.seo.metaDescription || loginContent.tagline
                }
              />
              <meta
                property="og:image"
                content={loginContent.seo.openGraphImage.asset.url}
              />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:title"
                content={loginContent.seo.metaTitle || loginContent.title}
              />
              <meta
                name="twitter:description"
                content={
                  loginContent.seo.metaDescription || loginContent.tagline
                }
              />
              <meta
                name="twitter:image"
                content={loginContent.seo.openGraphImage.asset.url}
              />
            </>
          )}
        </Head>
      )}

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
              <div className="mx-auto w-16 h-16 bg-[#f15A24] rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-in zoom-in-50 duration-500 delay-200">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-300">
                Login to Contato
              </h1>
            </div>

            {/* Authentication Error */}
            {error && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-3 duration-500">
                <div className="bg-orange-100 border border-[#f15A24] text-[#f15A24] px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              </div>
            )}

            {/* Email/Password Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-3 duration-500 delay-700"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={cn(
                    "h-12 bg-white border-[#f15A24] focus:border-[#f15A24] focus:ring-[#f15A24] transition-all duration-200 shadow-sm text-gray-800",
                    errors.email &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 animate-in fade-in-50 slide-in-from-left-2 duration-300">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={cn(
                      "h-12 pr-11 bg-white border-[#f15A24] focus:border-[#f15A24] focus:ring-[#f15A24] transition-all duration-200 shadow-sm text-gray-800",
                      errors.password &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-4 text-gray-400 hover:text-[#f15A24] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 animate-in fade-in-50 slide-in-from-left-2 duration-300">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Keep me logged in / Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-[#f15A24] text-[#f15A24] focus:ring-[#f15A24]"
                  />
                  <span className="text-gray-600">Keep me logged in</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-[#f15A24] hover:text-orange-700 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#f15A24] to-[#d04f23] hover:from-[#d04f23] hover:to-[#f15A24] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-600 animate-in fade-in-50 duration-500 delay-1000">
              Don&apos;t have an account?{" "}
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
                {loginContent?.title}
                <br />
                <span className="bg-gradient-to-r from-[#f15A24] to-[#d04f23] bg-clip-text text-transparent">
                  {loginContent?.heading}
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-md mx-auto">
                {loginContent?.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#f15A24] opacity-80">
          <span className="text-xs font-medium select-none mb-1">
            Scroll to see more
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </>
  ) : null;
}

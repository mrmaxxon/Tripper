"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 border border-amber-500/20">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h1 className="text-3xl font-extrabold text-[#17201c] mb-3">
        Something went wrong
      </h1>
      <p className="text-[#6b7280] max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        We encountered a temporary issue while loading this page. Please try refreshing or return to the homepage.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()}
          className="rounded-full px-6 bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            className="rounded-full px-6 border-[#ebe5dc] text-[#17201c] hover:bg-white flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

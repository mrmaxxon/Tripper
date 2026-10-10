"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { auth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#faf8f5]">
      <Navigation />
      <main className="flex-grow pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full flex flex-col justify-center">
        <div className="unseen-card rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#0f6b4f]/10 text-[#0f6b4f] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#17201c]">
              {isRegister ? "Create Customer Account" : "Welcome Back"}
            </h1>
            <p className="text-xs text-[#6b7280] mt-1">
              {isRegister
                ? "Register to track visas, documents, and custom trip itineraries"
                : "Sign in with your email to manage your bookings and files"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ebe5dc] text-[#17201c] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#ebe5dc] text-[#17201c] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40"
                />
              </div>
            </div>

            <Button disabled={loading} type="submit" className="w-full rounded-full mt-2 shadow-lg bg-[#0f6b4f] hover:bg-[#0c563f] text-white" size="lg">
              {loading ? "Please wait..." : (isRegister ? "Create Account" : "Sign In to Dashboard")}
              {!loading && <ArrowRight className="w-4 h-4 ml-1.5" />}
            </Button>
            
            {error && (
              <div className="p-3 mt-4 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg text-center">
                {error}
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-[#ebe5dc] text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-[#0f6b4f] font-semibold hover:underline"
            >
              {isRegister
                ? "Already have an account? Sign In"
                : "Don't have an account yet? Register here"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { Navigation } from "@/components/Navigation";
import { User, FileText, Plane, Compass, Download, Clock, CheckCircle, ArrowRight, LogOut, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [localRequests, setLocalRequests] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    try {
      const stored = localStorage.getItem("tripper_requests");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setLocalRequests(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] font-semibold text-[#0f6b4f]">
        Loading Account...
      </div>
    );
  }

  const visaCount = localRequests.filter((r) => r.serviceType === "visa").length;
  const planCount = localRequests.filter((r) => r.serviceType === "quotation" || r.serviceType === "package").length;
  const docCount = localRequests.filter((r) => r.serviceType === "document").length;

  return (
    <div className="flex-1 flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Profile Welcome Header */}
        <div className="unseen-card rounded-3xl p-8 mb-10 border border-[#ebe5dc] flex flex-col md:flex-row justify-between md:items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0f6b4f] text-white flex items-center justify-center font-bold text-2xl shadow-lg uppercase">
              {user?.email?.charAt(0) || "U"}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#0f6b4f]">Customer Account</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17201c]">{user?.email?.split("@")[0]}</h1>
              <p className="text-xs text-[#6b7280]">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full text-xs border-[#ebe5dc] text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer font-bold"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Sign Out
            </Button>
            <Link href="/trip-planner">
              <Button
                variant="outline"
                className="rounded-full text-xs border-[#ebe5dc] text-[#17201c] hover:border-[#0f6b4f] cursor-pointer font-bold"
              >
                <Compass className="w-4 h-4 mr-1.5 text-[#0f6b4f]" />
                New Trip Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-[#ebe5dc] shadow-sm">
            <span className="text-xs text-[#6b7280] uppercase font-bold block mb-1">Active Visa Files</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#17201c]">{visaCount > 0 ? visaCount : "1"}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-[#0f6b4f] font-semibold">
                {visaCount > 0 ? `${visaCount} in Progress` : "Demo File Active"}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ebe5dc] shadow-sm">
            <span className="text-xs text-[#6b7280] uppercase font-bold block mb-1">Saved Itineraries & Tours</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#17201c]">{planCount}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#6b7280] font-semibold">
                {planCount > 0 ? "Saved Quotes" : "Ready to plan"}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ebe5dc] shadow-sm">
            <span className="text-xs text-[#6b7280] uppercase font-bold block mb-1">Document Attestations</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#17201c]">{docCount > 0 ? docCount : "1"}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-semibold">
                {docCount > 0 ? `${docCount} Verified` : "Demo Attestation"}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Applications & Files List */}
        <div className="unseen-card rounded-3xl p-8 border border-[#ebe5dc] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#17201c]">Recent Applications & Bookings</h2>
            <Link href="/track-request">
              <span className="text-xs font-bold text-[#0f6b4f] hover:underline cursor-pointer">
                Track by Reference ID →
              </span>
            </Link>
          </div>

          <div className="divide-y divide-[#ebe5dc]">
            {/* Show any client submissions stored from ActionModal */}
            {localRequests.map((req) => (
              <div key={req.refId} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#0f6b4f]">{req.refId}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 font-semibold">
                      {req.status || "Application Submitted"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#17201c]">{req.service}</h3>
                  <p className="text-xs text-[#6b7280]">
                    Applicant: {req.applicant} | Submitted: {req.submittedAt}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/track-request?ref=${req.refId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs border-[#ebe5dc] text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white cursor-pointer font-bold"
                    >
                      Track Live
                    </Button>
                  </Link>
                  <Button
                    onClick={handlePrint}
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-xs flex items-center gap-1 text-[#17201c] hover:bg-gray-100 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Receipt
                  </Button>
                </div>
              </div>
            ))}

            {/* Standard prefilled demo files for preview */}
            <div className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#0f6b4f]">TRIP-2026-9041</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-semibold">
                    In Consular Review
                  </span>
                </div>
                <h3 className="font-semibold text-[#17201c]">UAE Tourist Visa (30-Day Express)</h3>
                <p className="text-xs text-[#6b7280]">Passport: A084**** | Submitted on Oct 08, 2026</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/track-request?ref=TRIP-2026-9041">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs border-[#ebe5dc] text-[#17201c] hover:bg-gray-50 cursor-pointer font-semibold"
                  >
                    Track Live
                  </Button>
                </Link>
                <Button
                  onClick={handlePrint}
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs flex items-center gap-1 text-[#17201c] hover:bg-gray-100 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Receipt
                </Button>
              </div>
            </div>

            <div className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-600">TRIP-2026-8812</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                    Completed & Dispatched
                  </span>
                </div>
                <h3 className="font-semibold text-[#17201c]">MOFA Attestation & Certified English Translation</h3>
                <p className="text-xs text-[#6b7280]">Marriage & Birth Certificate | Delivered Oct 05, 2026</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePrint}
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs flex items-center gap-1 text-[#17201c] hover:bg-gray-100 cursor-pointer font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  Attestation PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

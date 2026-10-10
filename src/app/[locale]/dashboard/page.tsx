"use client";

import { Navigation } from "@/components/Navigation";
import { User, FileText, Plane, Compass, Download, Clock, CheckCircle, ArrowRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">Loading...</div>;

  return (
    <div className="flex-1 flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Profile Welcome Header */}
        <div className="unseen-card rounded-3xl p-8 mb-10 border border-[#ebe5dc] flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0f6b4f] text-white flex items-center justify-center font-bold text-2xl shadow-lg uppercase">
              {user?.email?.charAt(0) || 'U'}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#0f6b4f]">Customer Account</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17201c]">{user?.email?.split('@')[0]}</h1>
              <p className="text-xs text-[#6b7280]">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleLogout} variant="outline" className="rounded-full text-xs border-[#ebe5dc] text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="w-4 h-4 mr-1.5" />
              Sign Out
            </Button>
            <Link href="/trip-planner">
              <Button variant="outline" className="rounded-full text-xs border-[#ebe5dc] text-[#17201c]">
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
              <span className="text-3xl font-extrabold text-[#17201c]">0</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#6b7280] font-semibold">No records</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ebe5dc] shadow-sm">
            <span className="text-xs text-[#6b7280] uppercase font-bold block mb-1">Saved Itineraries</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#17201c]">0</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#6b7280] font-semibold">No records</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ebe5dc] shadow-sm">
            <span className="text-xs text-[#6b7280] uppercase font-bold block mb-1">Document Attestations</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#17201c]">0</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#6b7280] font-semibold">No records</span>
            </div>
          </div>
        </div>

        {/* Recent Applications & Files List */}
        <div className="unseen-card rounded-3xl p-8 border border-[#ebe5dc]">
          <h2 className="text-xl font-bold text-[#17201c] mb-6">Recent Applications & Bookings</h2>

          <div className="divide-y divide-[#ebe5dc]">
            <div className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#0f6b4f]">TRIP-2026-9041</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">In Consular Review</span>
                </div>
                <h3 className="font-semibold text-[#17201c]">UAE Tourist Visa (30-Day Express)</h3>
                <p className="text-xs text-[#6b7280]">Passport: A084**** | Submitted on Oct 08, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/track-request">
                  <Button variant="outline" size="sm" className="rounded-full text-xs border-[#ebe5dc] text-[#17201c] hover:bg-gray-50">
                    Track Live
                  </Button>
                </Link>
              </div>
            </div>

            <div className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-600">TRIP-2026-8812</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">Completed</span>
                </div>
                <h3 className="font-semibold text-[#17201c]">MOFA Attestation & Certified English Translation</h3>
                <p className="text-xs text-[#6b7280]">Marriage & Birth Certificate | Delivered Oct 05, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="rounded-full text-xs flex items-center gap-1 text-[#17201c]">
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

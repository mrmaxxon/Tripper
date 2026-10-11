"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Search, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, ShieldCheck, Printer, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";

interface RequestRecord {
  refId: string;
  service: string;
  applicant: string;
  phone: string;
  email?: string;
  date?: string;
  notes?: string;
  serviceType?: string;
  status?: string;
  submittedAt?: string;
}

export default function TrackRequestPage() {
  const locale = useLocale();
  const isBn = locale === "bn";
  const [refId, setRefId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [recentRecords, setRecentRecords] = useState<RequestRecord[]>([]);
  const [activeResult, setActiveResult] = useState<any>(null);

  // Load from localStorage on mount & check query params
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tripper_requests");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentRecords(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryRef = params.get("ref");
      if (queryRef) {
        setRefId(queryRef);
        performSearch(queryRef);
      }
    }
  }, []);

  const buildResultFromRecord = (record: RequestRecord) => {
    const isVisa = record.serviceType === "visa";
    const isPackage = record.serviceType === "package";
    const isDoc = record.serviceType === "document";

    const steps = isVisa
      ? [
          { name: "Application Submitted & Document Intake", status: "completed", date: record.submittedAt || "Recent" },
          { name: "Legal Document Verification & Notarization", status: "completed", date: "Verified" },
          { name: "Consular & Embassy Processing", status: "current", date: "In Progress" },
          { name: "Final Visa Stamp & Dispatch", status: "pending", date: "Est. 3-7 Days" }
        ]
      : isPackage
      ? [
          { name: "Booking Request Received", status: "completed", date: record.submittedAt || "Recent" },
          { name: "Travel Consultant Review & Confirmation", status: "current", date: "In Progress" },
          { name: "Hotel & Transport Voucher Issue", status: "pending", date: "Pending Confirmation" },
          { name: "Trip Departure & Dedicated Concierge", status: "pending", date: record.date || "Scheduled" }
        ]
      : isDoc
      ? [
          { name: "Intake & Attestation Request Logged", status: "completed", date: record.submittedAt || "Recent" },
          { name: "Document Verification & Seal Check", status: "current", date: "In Progress" },
          { name: "Ministry / Notary Authorization", status: "pending", date: "Pending Authorization" },
          { name: "Apostille Dispatch & Courier", status: "pending", date: "Est. 2-3 Days" }
        ]
      : [
          { name: "Quotation Generated & Stored", status: "completed", date: record.submittedAt || "Recent" },
          { name: "Cost Model Audit & Custom Routing", status: "current", date: "In Progress" },
          { name: "Official Proforma Invoice Dispatch", status: "pending", date: "Within 12 Hours" }
        ];

    return {
      refId: record.refId,
      service: record.service,
      applicant: record.applicant,
      phone: record.phone,
      email: record.email,
      status: record.status || "Under Active Processing",
      submittedAt: record.submittedAt || "Oct 2026",
      estimatedCompletion: "Within 3-5 Working Days",
      steps
    };
  };

  const performSearch = (searchKey: string) => {
    const cleanKey = searchKey.trim().toLowerCase();
    if (!cleanKey) return;

    let match: RequestRecord | undefined;
    try {
      const stored = localStorage.getItem("tripper_requests");
      if (stored) {
        const list: RequestRecord[] = JSON.parse(stored);
        match = list.find(
          (r) =>
            r.refId.toLowerCase() === cleanKey ||
            r.phone.replace(/[^0-9]/g, "") === cleanKey.replace(/[^0-9]/g, "")
        );
      }
    } catch (e) {
      console.error(e);
    }

    if (match) {
      setActiveResult(buildResultFromRecord(match));
    } else {
      // Fallback demo mock so any ID works for demonstration
      setActiveResult({
        refId: searchKey.toUpperCase(),
        service: "UAE 30-Day Tourist Visa & MOFA Attestation",
        applicant: "Mohammad Tanvir Ahmed",
        status: "Embassy Review",
        submittedAt: "Recent",
        estimatedCompletion: "Within 3-5 Business Days",
        steps: [
          { name: "Application Submitted & Document Intake", status: "completed", date: "Step 1" },
          { name: "Legal Document Verification & Notarization", status: "completed", date: "Step 2" },
          { name: "Consular & Embassy Processing", status: "current", date: "In Progress" },
          { name: "Final Visa Stamp & Dispatch", status: "pending", date: "Pending" }
        ]
      });
    }

    setHasSearched(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(refId);
  };

  const handleDownloadReceipt = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-sm font-semibold mb-3 border border-amber-500/20">
            <Search className="w-4 h-4" />
            <span>{isBn ? "লাইভ স্ট্যাটাস ট্র্যাকার" : "Real-time Status Checker"}</span>
          </div>
          <h1 className="text-4xl font-bold text-[#17201c] mb-3">
            {isBn ? "আবেদন ও কোটেশন ট্র্যাকিং" : "Track Application & Quotations"}
          </h1>
          <p className="text-[#6b7280] text-base max-w-xl mx-auto">
            {isBn
              ? "আপনার রেফারেন্স নম্বর (যেমন: TRIP-2026-9041) বা ফোন নম্বর দিন এবং লাইভ অগ্রগতি দেখুন।"
              : "Input your Reference Number (e.g. TRIP-2026-9041) or phone number to see live embassy and document stages."}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-3 rounded-2xl mb-6 border border-[#ebe5dc] flex gap-3 shadow-sm">
          <div className="relative flex-grow">
            <input
              type="text"
              required
              placeholder={isBn ? "রেফারেন্স নম্বর দিন (যেমন TRIP-2026-9041)..." : "Enter Reference ID (e.g., TRIP-2026-9041)..."}
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white border border-[#ebe5dc] text-[#17201c] focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40 text-sm sm:text-base placeholder:text-[#6b7280]/60"
            />
          </div>
          <Button type="submit" size="lg" className="rounded-xl px-8 flex-shrink-0 bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white cursor-pointer font-bold">
            <Search className="w-4 h-4 mr-1.5" />
            {isBn ? "ট্র্যাক করুন" : "Track"}
          </Button>
        </form>

        {/* Quick click pills from recent device submissions */}
        {recentRecords.length > 0 && (
          <div className="mb-10 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f6b4f] mr-2">
              <History className="w-3.5 h-3.5" />
              <span>{isBn ? "আপনার সাম্প্রতিক বুকিং:" : "Your Recent Bookings:"}</span>
            </div>
            {recentRecords.slice(0, 4).map((rec) => (
              <button
                key={rec.refId}
                type="button"
                onClick={() => {
                  setRefId(rec.refId);
                  performSearch(rec.refId);
                }}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-emerald-200 text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white transition-all shadow-xs cursor-pointer"
              >
                {rec.refId} ({rec.service})
              </button>
            ))}
          </div>
        )}

        {/* Tracking Details Display */}
        {hasSearched && activeResult && (
          <div className="unseen-card rounded-3xl p-8 border border-[#ebe5dc] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[#ebe5dc]">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#0f6b4f] block">
                  Reference: {activeResult.refId}
                </span>
                <h2 className="text-2xl font-bold text-[#17201c] mt-0.5">
                  {activeResult.service}
                </h2>
                <p className="text-xs text-[#6b7280] mt-1">
                  Applicant: <span className="font-semibold text-[#17201c]">{activeResult.applicant}</span>
                  {activeResult.phone && <span className="ml-2 font-mono">({activeResult.phone})</span>}
                </p>
              </div>

              <div className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 font-bold text-sm border border-amber-500/30 flex items-center gap-2 self-start sm:self-auto">
                <Clock className="w-4 h-4" />
                <span>{activeResult.status}</span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280] mb-6">
                Processing Timeline
              </h3>
              <div className="space-y-6">
                {activeResult.steps?.map((step: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                        step.status === "completed" ? "bg-[#0f6b4f] border-[#0f6b4f] text-white" :
                        step.status === "current" ? "bg-amber-100 border-amber-500 text-amber-600 animate-pulse" :
                        "bg-[#f5f5f5] border-[#ebe5dc] text-[#6b7280]"
                      }`}>
                        {step.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : 
                         step.status === "current" ? <Clock className="w-4 h-4" /> : 
                         <span className="text-xs font-bold">{idx + 1}</span>}
                      </div>
                      {idx !== activeResult.steps.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ${step.status === "completed" ? "bg-[#0f6b4f]/40" : "bg-[#ebe5dc]"}`} />
                      )}
                    </div>
                    <div className="pt-1 pb-4">
                      <p className={`font-semibold ${step.status === "pending" ? "text-[#6b7280]" : "text-[#17201c]"}`}>
                        {step.name}
                      </p>
                      <p className="text-xs text-[#6b7280] font-medium mt-0.5">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#ebe5dc] flex items-center justify-between">
              <div className="text-sm text-[#6b7280]">
                Est. Completion: <span className="font-bold text-[#17201c]">{activeResult.estimatedCompletion}</span>
              </div>
              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-bold border-[#ebe5dc] text-[#17201c] hover:bg-[#0f6b4f] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                {isBn ? "রসিদ প্রিন্ট করুন" : "Download / Print Receipt"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

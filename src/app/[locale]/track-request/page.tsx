"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Search, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrackRequestPage() {
  const [refId, setRefId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const mockResult = {
    refId: refId || "TRIP-2026-9041",
    service: "UAE 30-Day Tourist Visa & MOFA Attestation",
    applicant: "Mohammad Tanvir Ahmed",
    status: "Embassy Review",
    submittedAt: "Oct 08, 2026",
    estimatedCompletion: "Oct 14, 2026",
    steps: [
      { name: "Application Submitted & Document Intake", status: "completed", date: "Oct 08" },
      { name: "Legal Document Verification & Notarization", status: "completed", date: "Oct 09" },
      { name: "Consular & Embassy Processing", status: "current", date: "In Progress" },
      { name: "Final Visa Stamp & Dispatch", status: "pending", date: "Est. Oct 14" }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (refId.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-3 border border-amber-500/20">
            <Search className="w-4 h-4" />
            <span>Real-time Status Checker</span>
          </div>
          <h1 className="text-4xl font-bold text-[#17201c] mb-3">
            Track Application & Quotations
          </h1>
          <p className="text-[#6b7280] text-base max-w-xl mx-auto">
            Input your Reference Number (e.g. TRIP-2026-9041) or phone number to see live embassy and document stages.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-3 rounded-2xl mb-12 border border-[#ebe5dc] flex gap-3 shadow-sm">
          <div className="relative flex-grow">
            <input
              type="text"
              required
              placeholder="Enter Reference ID (e.g., TRIP-2026-9041)..."
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white border border-[#ebe5dc] text-[#17201c] focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40 text-sm sm:text-base placeholder:text-[#6b7280]/60"
            />
          </div>
          <Button type="submit" size="lg" className="rounded-xl px-8 flex-shrink-0 bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white">
            <Search className="w-4 h-4 mr-1.5" />
            Track
          </Button>
        </form>

        {/* Tracking Details Display */}
        {hasSearched && (
          <div className="unseen-card rounded-3xl p-8 border border-[#ebe5dc] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[#ebe5dc]">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#0f6b4f] block">
                  Reference: {mockResult.refId}
                </span>
                <h2 className="text-2xl font-bold text-[#17201c] mt-0.5">
                  {mockResult.service}
                </h2>
                <p className="text-xs text-[#6b7280] mt-1">
                  Applicant: <span className="font-semibold text-[#17201c]">{mockResult.applicant}</span>
                </p>
              </div>

              <div className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 font-bold text-sm border border-amber-500/30 flex items-center gap-2 self-start sm:self-auto">
                <Clock className="w-4 h-4" />
                <span>{mockResult.status}</span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280] mb-6">
                Processing Timeline
              </h3>
              <div className="space-y-6">
                {mockResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                        step.status === "completed" ? "bg-[#0f6b4f] border-[#0f6b4f] text-white" :
                        step.status === "current" ? "bg-amber-100 border-amber-500 text-amber-600" :
                        "bg-[#f5f5f5] border-[#ebe5dc] text-[#6b7280]"
                      }`}>
                        {step.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : 
                         step.status === "current" ? <Clock className="w-4 h-4" /> : 
                         <span className="text-xs font-bold">{idx + 1}</span>}
                      </div>
                      {idx !== mockResult.steps.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ${step.status === "completed" ? "bg-[#0f6b4f]/30" : "bg-[#ebe5dc]"}`} />
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
                Est. Completion: <span className="font-bold text-[#17201c]">{mockResult.estimatedCompletion}</span>
              </div>
              <Button variant="outline" size="sm" className="rounded-full text-xs font-bold border-[#ebe5dc] text-[#17201c] hover:bg-[#f5f5f5]">
                Download Receipt
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

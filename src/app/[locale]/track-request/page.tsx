"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Search, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrackRequestPage() {
  const [refId, setRefId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Demo active record matching customer sample queries
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-3 border border-amber-500/20">
            <Search className="w-4 h-4" />
            <span>Real-time Status Checker</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Track Application & Quotations
          </h1>
          <p className="text-foreground/75 text-base max-w-xl mx-auto">
            Input your Reference Number (e.g. TRIP-2026-9041) or phone number to see live embassy and document stages.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="glass-panel p-3 rounded-2xl mb-12 border border-border/60 flex gap-3 shadow-lg">
          <div className="relative flex-grow">
            <input
              type="text"
              required
              placeholder="Enter Reference ID (e.g., TRIP-2026-9041)..."
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-background border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm sm:text-base"
            />
          </div>
          <Button type="submit" size="lg" className="rounded-xl px-8 flex-shrink-0">
            <Search className="w-4 h-4 mr-1.5" />
            Track
          </Button>
        </form>

        {/* Tracking Details Display */}
        {hasSearched && (
          <div className="glass-card rounded-3xl p-8 border border-border/60 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-border/40">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-primary block">
                  Reference: {mockResult.refId}
                </span>
                <h2 className="text-2xl font-bold text-foreground mt-0.5">
                  {mockResult.service}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Applicant: <span className="font-semibold text-foreground/80">{mockResult.applicant}</span>
                </p>
              </div>

              <div className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm border border-amber-500/30 flex items-center gap-2 self-start sm:self-auto">
                <Clock className="w-4 h-4" />
                <span>{mockResult.status}</span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
                Processing Timeline
              </h3>
              <div className="space-y-6">
                {mockResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      ) : step.status === "current" ? (
                        <div className="w-6 h-6 rounded-full border-4 border-amber-500 bg-background flex items-center justify-center animate-pulse" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-border/80 bg-muted/40" />
                      )}
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline">
                        <h4
                          className={`font-semibold text-base ${
                            step.status === "completed"
                              ? "text-foreground"
                              : step.status === "current"
                              ? "text-amber-600 dark:text-amber-400 font-bold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.name}
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium">
                          {step.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-muted-foreground">
                Questions about your file? Contact support with your Reference ID.
              </span>
              <Button variant="outline" size="sm" className="rounded-full">
                Download Latest Receipt (PDF)
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-foreground text-background py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-xl">Trip<span className="text-primary">per</span></div>
          <p className="text-background/60 text-sm">© 2026 Tripper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

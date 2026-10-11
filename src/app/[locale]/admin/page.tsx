"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Shield, Plus, CheckCircle, Clock, AlertTriangle, Users, FileText, Globe, Layers, ArrowUpDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RequestItem {
  id: string;
  customer: string;
  service: string;
  status: string;
  fee: string;
  date: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "destinations" | "visas">("requests");
  const [requests, setRequests] = useState<RequestItem[]>([
    { id: "REQ-101", customer: "Rafiqul Islam", service: "UK Standard Visitor Visa", status: "New", fee: "৳ 22,000", date: "Today" },
    { id: "REQ-102", customer: "Farhana Yasmin", service: "MOFA & Notary Attestation", status: "Processing", fee: "৳ 4,500", date: "Yesterday" },
    { id: "REQ-103", customer: "Tanvir Ahmed", service: "UAE 30-Day Express Visa", status: "Embassy Review", fee: "৳ 14,000", date: "Oct 08" },
    { id: "REQ-104", customer: "Mahmud Hasan", service: "Sajek Tour Package (2 Persons)", status: "Completed", fee: "৳ 15,000", date: "Oct 05" }
  ]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Load from localStorage if any customer submissions exist
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tripper_requests");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const userRequests: RequestItem[] = parsed.map((item) => ({
            id: item.refId,
            customer: item.applicant,
            service: item.service,
            status: item.status || "New",
            fee: item.serviceType === "visa" ? "৳ 11,000" : item.serviceType === "package" ? "৳ 16,500" : "৳ 3,500",
            date: item.submittedAt || "Just now"
          }));
          setRequests((prev) => {
            const combined = [...userRequests, ...prev];
            const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
            return unique;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUpdateStatus = (id: string) => {
    const statusCycle = ["New", "Processing", "Embassy Review", "Completed"];
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const currentIndex = statusCycle.indexOf(r.status);
          const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
          
          // update in localStorage if present
          try {
            const stored = localStorage.getItem("tripper_requests");
            if (stored) {
              const list = JSON.parse(stored);
              const updated = list.map((item: any) =>
                item.refId === id ? { ...item, status: nextStatus } : item
              );
              localStorage.setItem("tripper_requests", JSON.stringify(updated));
            }
          } catch (e) {
            console.error(e);
          }

          return { ...r, status: nextStatus };
        }
        return r;
      })
    );

    setStatusMessage(`Request ${id} status successfully updated!`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAddSample = () => {
    const newId = `REQ-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: RequestItem = {
      id: newId,
      customer: "Shahriar Kabir",
      service: "Cox's Bazar 3-Day Package Booking",
      status: "New",
      fee: "৳ 16,500",
      date: "Just now"
    };
    setRequests([newRecord, ...requests]);
    setStatusMessage(`Added new mock inquiry ${newId}`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 pb-6 border-b border-border/50">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold mb-2 border border-amber-500/20">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Operations Center</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Agency Management & Controls</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage customer inquiries, visa updates, and website content.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleAddSample} size="sm" className="rounded-full shadow-md text-xs cursor-pointer font-bold bg-[#0f6b4f] text-white">
              <Plus className="w-4 h-4 mr-1" />
              Add Test Lead
            </Button>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Metric Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="glass-panel p-5 rounded-2xl border border-border/50 bg-white">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Total Inquiries</span>
            <span className="text-2xl font-extrabold text-foreground">{requests.length}</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-border/50 bg-white">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Active Processing</span>
            <span className="text-2xl font-extrabold text-amber-500">
              {requests.filter(r => r.status === "Processing" || r.status === "Embassy Review").length}
            </span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-border/50 bg-white">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Dispatched / Done</span>
            <span className="text-2xl font-extrabold text-emerald-500">
              {requests.filter(r => r.status === "Completed").length}
            </span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-border/50 bg-white">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Monthly Pipeline</span>
            <span className="text-2xl font-extrabold text-foreground">৳ 4,82,000</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-border/50 mb-6 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "requests" ? "bg-[#0f6b4f] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Client Requests & Leads ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab("visas")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "visas" ? "bg-[#0f6b4f] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Visa Countries & Requirements
          </button>
          <button
            onClick={() => setActiveTab("destinations")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "destinations" ? "bg-[#0f6b4f] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bangladesh Tour Guides
          </button>
        </div>

        {/* Table of requests */}
        {activeTab === "requests" && (
          <div className="glass-card rounded-3xl overflow-hidden border border-border/60 shadow-lg bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/60 text-muted-foreground text-xs uppercase font-bold border-b border-border/40">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Requested Service</th>
                    <th className="px-6 py-4">Quotation Fee</th>
                    <th className="px-6 py-4">Current Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-xs text-[#0f6b4f]">{req.id}</td>
                      <td className="px-6 py-4 font-semibold text-foreground">{req.customer}</td>
                      <td className="px-6 py-4 text-foreground/80">{req.service}</td>
                      <td className="px-6 py-4 font-semibold text-foreground">{req.fee}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            req.status === "New"
                              ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                              : req.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          onClick={() => handleUpdateStatus(req.id)}
                          variant="ghost"
                          size="sm"
                          className="text-xs font-bold text-[#0f6b4f] hover:bg-[#0f6b4f]/10 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1" />
                          Update Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "visas" && (
          <div className="glass-card rounded-3xl p-8 border border-border/60 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-foreground">Active Published Visa Countries (Connected to Firebase)</h3>
              <span className="text-xs text-emerald-600 font-semibold">● 8 Live Visa Destinations</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Thailand (thailand)",
                "Singapore (singapore)",
                "Malaysia (malaysia)",
                "Saudi Arabia (saudi-arabia)",
                "Schengen Area (schengen)",
                "United Arab Emirates (uae)",
                "United Kingdom (uk)",
                "United States (usa)"
              ].map((c) => (
                <div key={c} className="p-4 rounded-xl border border-border/60 bg-muted/20">
                  <span className="font-semibold text-sm block">{c}</span>
                  <span className="text-xs text-emerald-600 font-medium mt-1 block">Status: Published (Active)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "destinations" && (
          <div className="glass-card rounded-3xl p-8 border border-border/60 bg-white">
            <h3 className="font-bold text-lg text-foreground mb-4">Bangladesh Tourism Content Manager</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Covering 8 administrative divisions and 64 districts. You can approve user submissions for hidden gems and update seasonal budget guides here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="sm" className="rounded-full bg-[#0f6b4f] text-white font-bold cursor-pointer">
                Add New District Spot
              </Button>
              <Button variant="outline" size="sm" className="rounded-full cursor-pointer font-bold">
                Moderate Community Submissions
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

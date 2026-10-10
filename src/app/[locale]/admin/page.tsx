"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Shield, Plus, CheckCircle, Clock, AlertTriangle, Users, FileText, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "destinations" | "visas">("requests");

  const [mockRequests, setMockRequests] = useState([
    { id: "REQ-101", customer: "Rafiqul Islam", service: "UK Standard Visitor Visa", status: "New", fee: "৳ 22,000", date: "Today" },
    { id: "REQ-102", customer: "Farhana Yasmin", service: "MOFA & Notary Attestation", status: "Processing", fee: "৳ 4,500", date: "Yesterday" },
    { id: "REQ-103", customer: "Tanvir Ahmed", service: "UAE 30-Day Express Visa", status: "Embassy Review", fee: "৳ 14,000", date: "Oct 08" },
    { id: "REQ-104", customer: "Mahmud Hasan", service: "Sajek Tour Package (2 Persons)", status: "Completed", fee: "৳ 15,000", date: "Oct 05" }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 pb-6 border-b border-border/50">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2 border border-amber-500/20">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Operations Center</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Agency Management & Controls</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage customer inquiries, visa updates, and website content.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" className="rounded-full shadow-md text-xs">
              <Plus className="w-4 h-4 mr-1" />
              New Visa Country
            </Button>
          </div>
        </div>

        {/* Metric Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="glass-panel p-5 rounded-2xl border border-border/50">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Total Inquiries</span>
            <span className="text-2xl font-extrabold text-foreground">148</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-border/50">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Active Processing</span>
            <span className="text-2xl font-extrabold text-amber-500">24</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-border/50">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Dispatched Visas</span>
            <span className="text-2xl font-extrabold text-emerald-500">119</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-border/50">
            <span className="text-xs text-muted-foreground uppercase font-bold block mb-1">Revenue (This Month)</span>
            <span className="text-2xl font-extrabold text-foreground">৳ 4,82,000</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-border/50 mb-6 pb-2">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "requests" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Client Requests & Leads
          </button>
          <button
            onClick={() => setActiveTab("visas")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "visas" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Visa Countries & Requirements
          </button>
          <button
            onClick={() => setActiveTab("destinations")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "destinations" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bangladesh Tour Guides
          </button>
        </div>

        {/* Table of requests */}
        {activeTab === "requests" && (
          <div className="glass-card rounded-3xl overflow-hidden border border-border/60 shadow-lg">
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
                  {mockRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-xs text-primary">{req.id}</td>
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
                        <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary">
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
          <div className="glass-card rounded-3xl p-8 border border-border/60">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-foreground">Active Published Visa Countries (Connected to Firebase)</h3>
              <span className="text-xs text-emerald-500 font-semibold">● 4 Live Documents</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {["United Arab Emirates (uae)", "India (india)", "United Kingdom (uk)", "United States (usa)"].map((c) => (
                <div key={c} className="p-4 rounded-xl border border-border/60 bg-muted/20">
                  <span className="font-semibold text-sm block">{c}</span>
                  <span className="text-xs text-muted-foreground mt-1 block">Status: Published (Active)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "destinations" && (
          <div className="glass-card rounded-3xl p-8 border border-border/60">
            <h3 className="font-bold text-lg text-foreground mb-4">Bangladesh Tourism Content Manager</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Covering 8 administrative divisions and 64 districts. You can approve user submissions for hidden gems and update seasonal budget guides here.
            </p>
            <div className="flex gap-4">
              <Button size="sm" className="rounded-full">Add New District Spot</Button>
              <Button variant="outline" size="sm" className="rounded-full">Moderate Community Submissions</Button>
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

"use client";

import { useState } from "react";
import { X, CheckCircle2, Copy, ArrowRight, ShieldCheck, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@/i18n/routing";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  serviceType: "visa" | "package" | "document" | "quotation";
  initialData?: {
    name?: string;
    price?: string | number;
    destination?: string;
  };
  locale?: string;
}

export function ActionModal({
  isOpen,
  onClose,
  title,
  subtitle,
  serviceType,
  initialData,
  locale = "en"
}: ActionModalProps) {
  const isBn = locale === "bn";
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    const refId = `TRIP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      refId,
      service: initialData?.name || title,
      applicant: fullName,
      phone,
      email,
      date: date || new Date().toISOString().split("T")[0],
      notes,
      serviceType,
      status: "Application Submitted",
      submittedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      estimatedCompletion: "In 3-7 Business Days",
      steps: [
        { name: "Application Submitted & Document Intake", status: "completed", date: "Just now" },
        { name: "Verification & Compliance Audit", status: "current", date: "In Progress" },
        { name: "Processing & Official Confirmation", status: "pending", date: "Upcoming" },
        { name: "Final Delivery & Notification", status: "pending", date: "Pending" }
      ]
    };

    try {
      const existing = JSON.parse(localStorage.getItem("tripper_requests") || "[]");
      localStorage.setItem("tripper_requests", JSON.stringify([newRecord, ...existing]));
    } catch (err) {
      console.warn("Storage error", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRef(refId);
    }, 600);
  };

  const copyToClipboard = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFullName("");
    setPhone("");
    setEmail("");
    setDate("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ebe5dc] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6b7280] hover:text-[#17201c] hover:bg-[#f5f5f5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#0f6b4f]/10 text-[#0f6b4f] flex items-center justify-center mx-auto border-2 border-[#0f6b4f]/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#17201c]">
                {isBn ? "অনুরোধ সফলভাবে গৃহীত হয়েছে!" : "Request Submitted Successfully!"}
              </h3>
              <p className="text-sm text-[#6b7280] mt-1.5 max-w-sm mx-auto">
                {isBn
                  ? "আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন। আপনার আবেদন ট্র্যাক করার জন্য রেফারেন্স নম্বর সংরক্ষণ করুন।"
                  : "Our team will review your request shortly. Keep your Tracking Reference ID to check live updates."}
              </p>
            </div>

            {/* Reference ID Box */}
            <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#ebe5dc] flex items-center justify-between max-w-xs mx-auto">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-[#6b7280] block">
                  {isBn ? "ট্র্যাকিং আইডি" : "Tracking Reference ID"}
                </span>
                <span className="text-lg font-mono font-bold text-[#0f6b4f]">
                  {submittedRef}
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-xl bg-white border border-[#ebe5dc] text-xs font-semibold hover:bg-gray-50 flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5 text-[#0f6b4f]" />
                <span>{copied ? (isBn ? "কপি হয়েছে!" : "Copied!") : (isBn ? "কপি" : "Copy")}</span>
              </button>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/track-request?ref=${submittedRef}`}
                onClick={onClose}
                className="flex-1"
              >
                <Button className="w-full rounded-full bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white font-bold h-12 shadow-md">
                  {isBn ? "এখনই স্ট্যাটাস দেখুন" : "Track Status Now"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-full border-[#ebe5dc] text-[#17201c] h-12"
              >
                {isBn ? "সম্পন্ন" : "Done"}
              </Button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f6b4f]/10 text-[#0f6b4f] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {serviceType === "visa" && (isBn ? "ভিসা প্রসেসিং সেবা" : "Visa Processing Service")}
                {serviceType === "package" && (isBn ? "ট্যুর প্যাকেজ বুকিং" : "Tour Package Booking")}
                {serviceType === "document" && (isBn ? "নথিপত্র প্রস্তুত সেবা" : "Document Legalization")}
                {serviceType === "quotation" && (isBn ? "কাস্টম ভ্রমণ কোটেশন" : "Custom Travel Quotation")}
              </span>
              <h3 className="text-2xl font-bold text-[#17201c]">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-[#6b7280] mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {initialData?.price && (
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#ebe5dc] mb-5 flex justify-between items-center text-sm">
                <span className="text-[#6b7280] font-medium">{isBn ? "নির্ধারিত মূল্য:" : "Estimated Price:"}</span>
                <span className="text-lg font-bold text-[#0f6b4f]">৳ {initialData.price}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                  {isBn ? "আপনার পুরো নাম *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? "যেমন: মোহাম্মদ তানভীর" : "e.g. John Doe"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ebe5dc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                    {isBn ? "মোবাইল / হোয়াটসঅ্যাপ *" : "Phone / WhatsApp *"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700-000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ebe5dc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                    {isBn ? "ইমেইল ঠিকানা" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ebe5dc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                  {isBn ? "প্রত্যাশিত তারিখ" : "Preferred Date"}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ebe5dc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40 text-[#17201c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">
                  {isBn ? "অতিরিক্ত তথ্য / নোট" : "Additional Notes"}
                </label>
                <textarea
                  rows={2}
                  placeholder={isBn ? "আপনার নির্দিষ্ট চাহিদা বা যাত্রীর সংখ্যা লিখুন..." : "Any specific requirements or details..."}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#ebe5dc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white font-bold h-12 shadow-md"
                >
                  {isSubmitting
                    ? (isBn ? "সাবমিট হচ্ছে..." : "Submitting...")
                    : (isBn ? "অনুরোধ নিশ্চিত করুন" : "Confirm Request")}
                </Button>
              </div>

              <p className="text-[11px] text-center text-[#6b7280] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0f6b4f]" />
                {isBn ? "আপনার তথ্য সম্পূর্ণ সুরক্ষিত ও গোপনীয়।" : "Your data is strictly confidential & protected."}
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

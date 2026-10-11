"use client";

import { useState, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, CheckCircle2, FileText, ArrowLeft, PhoneCall } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { ActionModal } from "@/components/ActionModal";

const FALLBACK_COUNTRIES: Record<string, any> = {
  thailand: {
    name_en: "Thailand",
    name_bn: "থাইল্যান্ড",
    slug: "thailand",
    hero_image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop",
    overview_en: "Explore world-class beaches, Bangkok street food, and ancient Buddhist temples with seamless e-visa and sticker visa support.",
    overview_bn: "থাইল্যান্ডের সমুদ্র সৈকত, স্ট্রিট ফুড ও ঐতিহ্যবাহী বৌদ্ধ মন্দির উপভোগ করুন আমাদের সহজ ভিসা সহায়তায়।",
    processing_time: "3-5 Business Days",
    fee_bdt: "6,500",
    requirements_en: [
      "Original passport with minimum 6 months validity",
      "2 copies recent passport size photograph (white background, 35x45mm)",
      "Bank statement (last 6 months) with minimum balance of BDT 60,000 per person",
      "Bank solvency certificate",
      "Visiting card / Trade license copy (for business)",
      "Leave letter / NOC from employer (for jobholders)"
    ],
    requirements_bn: [
      "কমপক্ষে ৬ মাস মেয়াদ থাকা মূল পাসপোর্ট",
      "২ কপি সাম্প্রতিক পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড)",
      "বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট (জনপ্রতি কমপক্ষে ৬০,০০০ টাকা স্থিতি)",
      "ব্যাংক সলভেন্সি সার্টিফিকেট",
      "ভিজিটিং কার্ড / ট্রেড লাইসেন্স কপি (ব্যবসায়ীদের জন্য)",
      "নিয়োগদাতার এনওসি / ছুটির প্রত্যয়নপত্র (চাকরিজীবীদের জন্য)"
    ]
  },
  singapore: {
    name_en: "Singapore",
    name_bn: "সিঙ্গাপুর",
    slug: "singapore",
    hero_image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop",
    overview_en: "Futuristic skyline, Gardens by the Bay, and premier luxury shopping with guaranteed paperless e-visa assistance.",
    overview_bn: "আধুনিক নগরী সিঙ্গাপুরের দর্শনীয় স্থানসমূহ ভ্রমণ করুন সম্পূর্ণ পেপারলেস ই-ভিসা সহায়তায়।",
    processing_time: "3-4 Business Days",
    fee_bdt: "5,800",
    requirements_en: [
      "Original passport with minimum 6 months validity",
      "Recent passport-size photo (matte paper, white background)",
      "6-month bank statement with solvency certificate",
      "Company NOC / Visiting card",
      "Confirmed roundtrip flight booking"
    ],
    requirements_bn: [
      "কমপক্ষে ৬ মাস মেয়াদী বৈধ পাসপোর্ট",
      "সাম্প্রতিক ল্যাব প্রিন্ট ছবি",
      "৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি সার্টিফিকেট",
      "অফিস এনওসি বা ভিজিটিং কার্ড",
      "নিশ্চিতকৃত রিটার্ন এয়ার টিকিট"
    ]
  },
  malaysia: {
    name_en: "Malaysia",
    name_bn: "মালয়েশিয়া",
    slug: "malaysia",
    hero_image_url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop",
    overview_en: "Kuala Lumpur twin towers, Genting Highlands, and Langkawi island vacation visas processed in record time.",
    overview_bn: "কুয়ালালামপুর, গেন্টিং হাইল্যান্ডস ও ল্যাংকাউই ভ্রমণের জন্য দ্রুততম মালয়েশিয়া ই-ভিসা প্রসেসিং।",
    processing_time: "2-4 Business Days",
    fee_bdt: "4,500",
    requirements_en: [
      "Passport valid for at least 6 months",
      "35x50mm studio photo on white background",
      "Bank statement showing sufficient funds",
      "Hotel reservation and flight itinerary"
    ],
    requirements_bn: [
      "কমপক্ষে ৬ মাস মেয়াদ থাকা পাসপোর্ট",
      "৩৫x৫০ মিমি মাপের রঙিন ছবি",
      "পর্যাপ্ত ব্যালেন্সযুক্ত ব্যাংক স্টেটমেন্ট",
      "হোটেল বুকিং এবং ভ্রমণ পরিকল্পনা"
    ]
  },
  "saudi-arabia": {
    name_en: "Saudi Arabia",
    name_bn: "সৌদি আরব",
    slug: "saudi-arabia",
    hero_image_url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1200&auto=format&fit=crop",
    overview_en: "Official 1-year multiple entry tourist & Umrah electronic visa processing with round-the-clock guidance.",
    overview_bn: "পবিত্র ওমরাহ ও পর্যটন ভ্রমণের জন্য ১ বছরের মাল্টিপল এন্ট্রি ই-ভিসা দ্রুততম সময়ে সম্পন্ন করুন।",
    processing_time: "24-48 Hours",
    fee_bdt: "14,500",
    requirements_en: [
      "Valid Bangladeshi passport (minimum 6 months)",
      "Clear passport information page scan",
      "White background digital photograph",
      "Valid email and phone number for e-visa dispatch"
    ],
    requirements_bn: [
      "কমপক্ষে ৬ মাস মেয়াদী বাংলাদেশি পাসপোর্ট",
      "পাসপোর্টের পরিষ্কার স্ক্যান কপি",
      "ডিজিটাল পাসপোর্ট সাইজ ছবি",
      "ই-ভিসা গ্রহণের জন্য সক্রিয় ইমেইল ও মোবাইল নম্বর"
    ]
  },
  schengen: {
    name_en: "Schengen Area (Europe)",
    name_bn: "শেনজেন ইউরোপ",
    slug: "schengen",
    hero_image_url: "https://images.unsplash.com/photo-1516483638261-f40889d1c521?w=1200&auto=format&fit=crop",
    overview_en: "Access 27 European nations with a single visa. Complete appointment booking, dossier review, and travel itinerary.",
    overview_bn: "একটি ভিসায় ২৭টি ইউরোপীয় দেশ ভ্রমণ করুন। অ্যাপয়েন্টমেন্ট বুকিং ও ডকুমেন্ট প্রস্তুতির পূর্ণাঙ্গ সহায়তা।",
    processing_time: "15-20 Business Days",
    fee_bdt: "18,000",
    requirements_en: [
      "Valid passport with at least 2 blank pages",
      "Schengen visa application form duly signed",
      "Schengen approved travel medical insurance (EUR 30,000 cover)",
      "Bank statements (6 months) with verified tax returns (TIN/ITR)",
      "Detailed day-by-day travel itinerary with confirmed accommodation",
      "Cover letter explaining purpose of visit"
    ],
    requirements_bn: [
      "কমপক্ষে ২টি খালি পৃষ্ঠা বিশিষ্ট বৈধ পাসপোর্ট",
      "স্বাক্ষরিত শেনজেন ভিসা আবেদন ফরম",
      "অনুমোদিত ট্রাভেল মেডিকেল ইন্স্যুরেন্স (৩০,০০০ ইউরো কাভারেজ)",
      "বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট ও ট্যাক্স রিটার্ন পেপার",
      "বিস্তারিত ডে-টু-ডে ভ্রমণ পরিকল্পনা ও হোটেল বুকিং",
      "ভ্রমণের উদ্দেশ্য ব্যাখ্যা করে কভার লেটার"
    ]
  },
  uae: {
    name_en: "United Arab Emirates (Dubai)",
    name_bn: "সংযুক্ত আরব আমিরাত (দুবাই)",
    slug: "uae",
    hero_image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop",
    overview_en: "Instant 30-day and 60-day Dubai tourist visas for single and multiple entries with MOFA coordination.",
    overview_bn: "দুবাই ৩০ ও ৬০ দিনের সিঙ্গেল এবং মাল্টিপল এন্ট্রি ট্যুরিস্ট ভিসা অতি দ্রুততম সময়ে অনুমোদন।",
    processing_time: "24-72 Hours",
    fee_bdt: "11,000",
    requirements_en: [
      "Color scan of passport first and last pages",
      "Passport size color photo with white background",
      "National ID / Birth Certificate copy"
    ],
    requirements_bn: [
      "পাসপোর্টের স্পষ্ট রঙিন স্ক্যান কপি",
      "সাদা ব্যাকগ্রাউন্ড রঙিন ছবি",
      "জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন সনদের কপি"
    ]
  },
  uk: {
    name_en: "United Kingdom",
    name_bn: "যুক্তরাজ্য (ইউকে)",
    slug: "uk",
    hero_image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop",
    overview_en: "Full professional advisory for UK Standard Visitor visas, VFS Global appointments, and financial evidence review.",
    overview_bn: "যুক্তরাজ্য স্ট্যান্ডার্ড ভিজিটর ভিসার আবেদন, ভিএফএস গ্লোবাল অ্যাপয়েন্টমেন্ট ও ফাইল প্রস্তুতির বিশ্বস্ত সেবা।",
    processing_time: "3-4 Weeks",
    fee_bdt: "22,000",
    requirements_en: [
      "Valid passport and previous expired passports",
      "Evidence of employment/business and financial circumstances",
      "Proof of funds and genuine earnings",
      "Accommodation and flight booking confirmation"
    ],
    requirements_bn: [
      "বর্তমান পাসপোর্ট ও পূর্ববর্তী সকল মেয়াদোত্তীর্ণ পাসপোর্ট",
      "চাকরি/ব্যবসার প্রমাণপত্র ও আয়ের বিবরণী",
      "ব্যাংক ব্যালেন্স ও আয়ের উৎস সংক্রান্ত প্রমাণ",
      "থাকার স্থান ও ফ্লাইট বুকিং নিশ্চিতকরণ"
    ]
  },
  usa: {
    name_en: "United States",
    name_bn: "যুক্তরাষ্ট্র (ইউএসএ)",
    slug: "usa",
    hero_image_url: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&auto=format&fit=crop",
    overview_en: "DS-160 expert filling, appointment slot scheduling, interview mock preparation, and documentation audit.",
    overview_bn: "ইউএসএ ডিএস-১৬০ নির্ভুল পূরণ, অ্যাপয়েন্টমেন্ট শিডিউলিং ও ইন্টারভিউ মোক প্রস্তুতির বিশেষায়িত গাইড।",
    processing_time: "Slot Based",
    fee_bdt: "25,000",
    requirements_en: [
      "Valid passport valid for travel to the United States",
      "Confirmation page of application Form DS-160",
      "Application fee payment receipt",
      "Appointment confirmation letter",
      "Supporting financial & ties-to-home-country documentation"
    ],
    requirements_bn: [
      "যুক্তরাষ্ট্রে ভ্রমণের জন্য প্রযোজ্য বৈধ পাসপোর্ট",
      "ডিএস-১৬০ ফর্মের কনফার্মেশন পৃষ্ঠা",
      "ভিসা ফি প্রদানের রসিদ",
      "ইন্টারভিউ অ্যাপয়েন্টমেন্ট লেটার",
      "আর্থিক ও দেশে প্রত্যাবর্তনের সুদৃঢ় প্রমাণাদি"
    ]
  }
};

function VisaCountryDetailContent() {
  const locale = useLocale();
  const params = useParams();
  const slug = (params?.slug as string) || "thailand";
  const isBn = locale === "bn";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const country = FALLBACK_COUNTRIES[slug] || {
    name_en: slug.replace(/-/g, " ").toUpperCase(),
    name_bn: slug.replace(/-/g, " "),
    slug,
    hero_image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop",
    overview_en: "Professional visa processing and document submission assistance for your international destination.",
    overview_bn: "আপনার আন্তর্জাতিক গন্তব্যের জন্য পেশাদার ভিসা প্রসেসিং ও ডকুমেন্ট প্রস্তুতি সহায়তা।",
    processing_time: "5-7 Business Days",
    fee_bdt: "8,500",
    requirements_en: [
      "Valid original passport (min 6 months)",
      "Recent passport-sized photographs",
      "Bank statements for previous 6 months",
      "NOC / Business Trade License"
    ],
    requirements_bn: [
      "কমপক্ষে ৬ মাস মেয়াদী মূল পাসপোর্ট",
      "সাম্প্রতিক পাসপোর্ট সাইজ রঙিন ছবি",
      "বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট",
      "এনওসি অথবা ব্যবসায়িক ট্রেড লাইসেন্স"
    ]
  };

  const reqList = isBn
    ? (country.requirements_bn || country.requirements_en || [])
    : (country.requirements_en || []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />
          {country.hero_image_url && (
            <Image
              src={country.hero_image_url}
              alt={isBn ? country.name_bn : country.name_en}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl">
            <Link
              href="/visa-services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {isBn ? "সকল দেশের ভিসা তালিকা" : "Back to All Visa Services"}
            </Link>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-tight drop-shadow-md">
              {isBn ? country.name_bn : country.name_en}
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed drop-shadow">
              {isBn ? country.overview_bn : country.overview_en}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="rounded-full text-base h-12 px-8 shadow-lg bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white border-0 font-bold cursor-pointer active:scale-95 transition-all"
              >
                {isBn ? "ভিসা আবেদনের সহায়তা নিন" : "Start Visa Application"}
              </Button>
              <a href="tel:+8801700000000">
                <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-6 border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 cursor-pointer">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  {isBn ? "বিশেষজ্ঞের পরামর্শ" : "Talk to Consultant"}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#ebe5dc] shadow-sm p-8 rounded-2xl">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-[#0f6b4f]" />
                <h2 className="text-2xl font-bold text-[#17201c]">
                  {isBn ? "প্রয়োজনীয় ডকুমেন্টস ও কাগজপত্র" : "Required Documents & Checklists"}
                </h2>
              </div>
              <ul className="space-y-3.5 text-[#17201c]/85">
                {reqList.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-[#0f6b4f] flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#ebe5dc] shadow-sm p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-[#17201c] mb-3">
                {isBn ? "আমাদের প্রসেসিং পদক্ষেপসমূহ" : "Our Step-by-Step Process"}
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-6">
                {isBn
                  ? "আমরা আপনার ফাইল নিখুঁতভাবে অডিট করি, অফিসিয়াল ফরম পূরণ করি এবং এম্বাসি রিকোয়ারমেন্ট অনুযায়ী সাজিয়ে দেই যাতে ভিসা অনুমোদনের সম্ভাবনা সর্বোচ্চ থাকে।"
                  : "We meticulously audit your documents, accurately complete embassy application forms, and ensure full compliance to maximize your approval rate."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ebe5dc]">
                  <span className="w-7 h-7 rounded-full bg-[#0f6b4f] text-white font-bold text-xs inline-flex items-center justify-center mb-2">1</span>
                  <p className="text-xs font-bold text-[#17201c]">{isBn ? "ফাইল অডিট" : "File Audit"}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ebe5dc]">
                  <span className="w-7 h-7 rounded-full bg-[#0f6b4f] text-white font-bold text-xs inline-flex items-center justify-center mb-2">2</span>
                  <p className="text-xs font-bold text-[#17201c]">{isBn ? "আবেদন জমা" : "Submission"}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ebe5dc]">
                  <span className="w-7 h-7 rounded-full bg-[#0f6b4f] text-white font-bold text-xs inline-flex items-center justify-center mb-2">3</span>
                  <p className="text-xs font-bold text-[#17201c]">{isBn ? "ভিসা ডেলিভারি" : "Visa Delivery"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar / Quick Stats */}
          <div className="space-y-6">
            <div className="unseen-card border border-[#ebe5dc] p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-[#0f6b4f] mb-3">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold text-base text-[#17201c]">
                  {isBn ? "আনুমানিক সময়" : "Estimated Time"}
                </h3>
              </div>
              <p className="text-3xl font-extrabold text-[#0f6b4f] mb-1">
                {country.processing_time || "3 - 7 Days"}
              </p>
              <p className="text-xs text-[#6b7280]">
                {isBn ? "এম্বাসি যাচাইকরণ সময়ের উপর নির্ভরশীল" : "Subject to embassy working days"}
              </p>
            </div>

            <div className="unseen-card border border-[#ebe5dc] p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-[#0f6b4f] mb-3">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-base text-[#17201c]">
                  {isBn ? "প্রসেসিং ফি" : "Service Fee"}
                </h3>
              </div>
              <p className="text-2xl font-extrabold text-[#17201c] mb-2">
                ৳ {country.fee_bdt}
              </p>
              <p className="text-xs text-[#6b7280] leading-relaxed">
                {isBn
                  ? "ভিসা ক্যাটাগরি ও এম্বাসির নিয়ম অনুযায়ী ফি নির্ধারিত হয়।"
                  : "Government embassy fees + service processing fees included."}
              </p>
            </div>
            
            <div className="bg-[#f0f9f6] border border-[#0f6b4f]/20 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2 text-[#0f6b4f]">
                {isBn ? "জরুরি সহায়তা দরকার?" : "Need Urgent Help?"}
              </h3>
              <p className="text-sm text-[#17201c]/80 mb-5 leading-relaxed">
                {isBn
                  ? "আমাদের ভিসা বিশেষজ্ঞরা আপনার আবেদন পর্যালোচনা করতে প্রস্তুত।"
                  : "Our dedicated visa officers are available to review your files instantly."}
              </p>
              <a href="tel:+8801700000000" className="block w-full">
                <Button variant="outline" className="w-full rounded-full border-[#0f6b4f] text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white font-semibold cursor-pointer">
                  {isBn ? "সরাসরি কল করুন" : "Call +880 1700-000000"}
                </Button>
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Action Modal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isBn ? `${country.name_bn} ভিসা আবেদন` : `${country.name_en} Visa Application`}
        subtitle={isBn ? "নথিপত্র অডিট ও এম্বাসি সাবমিশন সেবা" : "Document verification & submission service"}
        serviceType="visa"
        initialData={{
          name: country.name_en,
          price: country.fee_bdt,
        }}
        locale={locale}
      />
    </div>
  );
}

export default function VisaCountryDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5]" />}>
      <VisaCountryDetailContent />
    </Suspense>
  );
}

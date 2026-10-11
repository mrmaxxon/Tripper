"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Compass, Search, Clock, ArrowRight, ShieldCheck, Globe2, Sparkles, Filter } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const DEFAULT_VISA_COUNTRIES = [
  {
    id: "thailand",
    slug: "thailand",
    name_en: "Thailand",
    name_bn: "থাইল্যান্ড",
    region: "Asia",
    processing_time: "3-5 Days",
    fee_bdt: "৳ 6,500",
    badge: "Popular Tourist",
    hero_image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop",
    overview_en: "Explore world-class beaches, Bangkok street food, and ancient Buddhist temples with seamless e-visa and sticker visa support.",
    overview_bn: "থাইল্যান্ডের সমুদ্র সৈকত, স্ট্রিট ফুড ও ঐতিহ্যবাহী বৌদ্ধ মন্দির উপভোগ করুন আমাদের সহজ ভিসা সহায়তায়।"
  },
  {
    id: "singapore",
    slug: "singapore",
    name_en: "Singapore",
    name_bn: "সিঙ্গাপুর",
    region: "Asia",
    processing_time: "3-4 Days",
    fee_bdt: "৳ 5,800",
    badge: "Fast E-Visa",
    hero_image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop",
    overview_en: "Futuristic skyline, Gardens by the Bay, and premier luxury shopping with guaranteed paperless e-visa assistance.",
    overview_bn: "আধুনিক নগরী সিঙ্গাপুরের দর্শনীয় স্থানসমূহ ভ্রমণ করুন সম্পূর্ণ পেপারলেস ই-ভিসা সহায়তায়।"
  },
  {
    id: "malaysia",
    slug: "malaysia",
    name_en: "Malaysia",
    name_bn: "মালয়েশিয়া",
    region: "Asia",
    processing_time: "2-4 Days",
    fee_bdt: "৳ 4,500",
    badge: "Best Value",
    hero_image_url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop",
    overview_en: "Kuala Lumpur twin towers, Genting Highlands, and Langkawi island vacation visas processed in record time.",
    overview_bn: "কুয়ালালামপুর, গেন্টিং হাইল্যান্ডস ও ল্যাংকাউই ভ্রমণের জন্য দ্রুততম মালয়েশিয়া ই-ভিসা প্রসেসিং।"
  },
  {
    id: "saudi-arabia",
    slug: "saudi-arabia",
    name_en: "Saudi Arabia",
    name_bn: "সৌদি আরব",
    region: "Middle East",
    processing_time: "24-48 Hours",
    fee_bdt: "৳ 14,500",
    badge: "Umrah & Tourist",
    hero_image_url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1200&auto=format&fit=crop",
    overview_en: "Official 1-year multiple entry tourist & Umrah electronic visa processing with round-the-clock guidance.",
    overview_bn: "পবিত্র ওমরাহ ও পর্যটন ভ্রমণের জন্য ১ বছরের মাল্টিপল এন্ট্রি ই-ভিসা দ্রুততম সময়ে সম্পন্ন করুন।"
  },
  {
    id: "schengen",
    slug: "schengen",
    name_en: "Schengen Area (Europe)",
    name_bn: "শেনজেন ইউরোপ",
    region: "Europe",
    processing_time: "15-20 Days",
    fee_bdt: "৳ 18,000",
    badge: "27 Countries",
    hero_image_url: "https://images.unsplash.com/photo-1516483638261-f40889d1c521?w=1200&auto=format&fit=crop",
    overview_en: "Access 27 European nations with a single visa. Complete appointment booking, dossier review, and travel itinerary.",
    overview_bn: "একটি ভিসায় ২৭টি ইউরোপীয় দেশ ভ্রমণ করুন। অ্যাপয়েন্টমেন্ট বুকিং ও ডকুমেন্ট প্রস্তুতির পূর্ণাঙ্গ সহায়তা।"
  },
  {
    id: "uae",
    slug: "uae",
    name_en: "United Arab Emirates (Dubai)",
    name_bn: "সংযুক্ত আরব আমিরাত (দুবাই)",
    region: "Middle East",
    processing_time: "24-72 Hours",
    fee_bdt: "৳ 11,000",
    badge: "Express Visa",
    hero_image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop",
    overview_en: "Instant 30-day and 60-day Dubai tourist visas for single and multiple entries with MOFA coordination.",
    overview_bn: "দুবাই ৩০ ও ৬০ দিনের সিঙ্গেল এবং মাল্টিপল এন্ট্রি ট্যুরিস্ট ভিসা অতি দ্রুততম সময়ে অনুমোদন।"
  },
  {
    id: "uk",
    slug: "uk",
    name_en: "United Kingdom",
    name_bn: "যুক্তরাজ্য (ইউকে)",
    region: "Europe",
    processing_time: "3-4 Weeks",
    fee_bdt: "৳ 22,000",
    badge: "Standard Visitor",
    hero_image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop",
    overview_en: "Full professional advisory for UK Standard Visitor visas, VFS Global appointments, and financial evidence review.",
    overview_bn: "যুক্তরাজ্য স্ট্যান্ডার্ড ভিজিটর ভিসার আবেদন, ভিএফএস গ্লোবাল অ্যাপয়েন্টমেন্ট ও ফাইল প্রস্তুতির বিশ্বস্ত সেবা।"
  },
  {
    id: "usa",
    slug: "usa",
    name_en: "United States (B1/B2)",
    name_bn: "যুক্তরাষ্ট্র (ইউএসএ)",
    region: "Americas",
    processing_time: "Slot Based",
    fee_bdt: "৳ 25,000",
    badge: "B1/B2 Tourist",
    hero_image_url: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&auto=format&fit=crop",
    overview_en: "DS-160 expert filling, appointment slot scheduling, interview mock preparation, and documentation audit.",
    overview_bn: "ইউএসএ ডিএস-১৬০ নির্ভুল পূরণ, অ্যাপয়েন্টমেন্ট শিডিউলিং ও ইন্টারভিউ মোক প্রস্তুতির বিশেষায়িত গাইড।"
  }
];

const REGIONS = ["All", "Asia", "Middle East", "Europe", "Americas"];

export default function VisaServicesPage() {
  const locale = useLocale();
  const t = useTranslations("VisaServices");
  const [countries, setCountries] = useState<any[]>(DEFAULT_VISA_COUNTRIES);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const isBn = locale === "bn";

  useEffect(() => {
    async function fetchCountries() {
      try {
        const snapshot = await getDocs(collection(db, "visa_countries"));
        if (!snapshot.empty) {
          const dbData = snapshot.docs.map((doc) => ({
            id: doc.id,
            slug: doc.data().slug || doc.id,
            name_en: doc.data().name_en || doc.id,
            name_bn: doc.data().name_bn || doc.data().name_en || doc.id,
            region: doc.data().region || "Asia",
            processing_time: doc.data().processing_time || "3-7 Days",
            fee_bdt: doc.data().fee_bdt || "Contact Us",
            badge: doc.data().badge || "Verified",
            hero_image_url: doc.data().hero_image_url || "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop",
            overview_en: doc.data().overview_en || "",
            overview_bn: doc.data().overview_bn || doc.data().overview_en || ""
          }));

          // Merge dbData with default list so all countries are available
          const existingSlugs = new Set(dbData.map((d) => d.slug));
          const merged = [
            ...dbData,
            ...DEFAULT_VISA_COUNTRIES.filter((d) => !existingSlugs.has(d.slug))
          ];
          setCountries(merged);
        }
      } catch (err) {
        console.warn("Using default visa country catalog:", err);
      }
    }
    fetchCountries();
  }, []);

  const filtered = countries.filter((item) => {
    const matchesRegion = selectedRegion === "All" || item.region === selectedRegion;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.name_en?.toLowerCase().includes(query) ||
      item.name_bn?.toLowerCase().includes(query) ||
      item.slug?.toLowerCase().includes(query);
    return matchesRegion && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f6b4f]/10 text-[#0f6b4f] text-sm font-semibold mb-3 border border-[#0f6b4f]/20">
            <Globe2 className="w-4 h-4" />
            <span>{isBn ? "আন্তর্জাতিক ভিসা প্রসেসিং ও কনসালট্যান্সি" : "Global Visa Processing & Advisory"}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm border border-[#ebe5dc]">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-[#0f6b4f] flex-shrink-0" />
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === region
                    ? "bg-[#0f6b4f] text-white shadow-md shadow-[#0f6b4f]/20"
                    : "bg-[#f5f5f5] text-[#6b7280] hover:bg-[#ebe5dc]"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder={isBn ? "দেশ খুঁজুন..." : "Search country..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-white border border-[#ebe5dc] focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40 text-[#17201c]"
            />
            <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-2.5" />
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((country) => (
            <Link
              key={country.slug}
              href={`/visa-services/${country.slug}`}
              className="block group"
            >
              <div className="unseen-card rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-[#ebe5dc]">
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  {country.hero_image_url && (
                    <Image
                      src={country.hero_image_url}
                      alt={isBn ? country.name_bn : country.name_en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                    {country.badge}
                  </span>

                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h2 className="text-2xl font-bold leading-tight">
                      {isBn ? country.name_bn : country.name_en}
                    </h2>
                    <p className="text-xs text-white/80 mt-0.5">
                      {country.region} • {country.processing_time}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <p className="text-[#6b7280] text-sm line-clamp-3 mb-6 leading-relaxed">
                    {isBn ? country.overview_bn : country.overview_en}
                  </p>

                  <div className="pt-4 border-t border-[#ebe5dc] flex items-center justify-between">
                    <span className="text-xs text-[#0f6b4f] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {isBn ? "প্রমাণিত প্রসেসিং" : "Verified Processing"}
                    </span>
                    <span className="text-sm text-[#0f6b4f] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {t("viewDetails")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

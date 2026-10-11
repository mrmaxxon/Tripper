"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Compass, MapPin, Eye, Sparkles, Filter, X, ArrowRight, Calendar, Route, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

const DIVISIONS = [
  "All",
  "Chattogram",
  "Dhaka",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Rangpur",
  "Mymensingh"
];

export default function ExploreBangladeshPage() {
  const locale = useLocale();
  const isBn = locale === "bn";
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, 'districts'));
        const data = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            nameEn: docData.name,
            nameBn: docData.bn_name,
            division: docData.division,
            district: docData.name,
            category: docData.popularSpots?.[0] || 'Tourism',
            popularSpots: docData.popularSpots || [],
            image: docData.image || "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=1200&auto=format&fit=crop",
            descEn: docData.description || "Discover scenic landscapes, riverine heritage, and authentic local traditions.",
            badge: "Popular Destination"
          };
        });
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching districts: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = destinations.filter((item) => {
    const matchesDiv = selectedDivision === "All" || item.division === selectedDivision;
    const matchesQuery =
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameBn?.includes(searchQuery) ||
      item.district?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiv && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-semibold mb-3 border border-emerald-500/20">
            <Compass className="w-4 h-4" />
            <span>{isBn ? "৬৪ জেলার দর্শনীয় স্থান ও অন্বেষণ" : "Discover 64 Districts Across 8 Divisions"}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#17201c] mb-4">
            {isBn ? "বাংলাদেশ এক্সপ্লোরার" : "Explore Bangladesh"}
          </h1>
          <p className="text-lg text-[#6b7280] leading-relaxed">
            {isBn
              ? "সিলেটের চা বাগান থেকে সুন্দরবনের ম্যানগ্রোভ এবং বান্দরবানের পাহাড়—অনন্য সব দর্শনীয় স্থান আবিষ্কার করুন।"
              : "From the tea gardens of Sylhet to the deep mangroves of Sundarbans and the hill tracts of Bandarban."}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-12 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm border border-[#ebe5dc]">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-[#0f6b4f] flex-shrink-0" />
            {DIVISIONS.map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDivision === div
                    ? "bg-[#0f6b4f] text-white shadow-md shadow-[#0f6b4f]/20"
                    : "bg-[#f5f5f5] text-[#6b7280] hover:bg-[#ebe5dc]"
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder={isBn ? "স্থান বা জেলা খুঁজুন..." : "Search by spot or district..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full text-sm bg-white border border-[#ebe5dc] focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40 text-[#17201c]"
            />
          </div>
        </div>

        {/* Destination Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#6b7280] font-medium">
            {isBn ? "দর্শনীয় স্থানসমূহ লোড হচ্ছে..." : "Loading destinations..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedSpot(item)}
                className="unseen-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-[#ebe5dc] group flex flex-col cursor-pointer"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.nameEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {item.badge}
                  </span>
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.district}, {item.division}</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {isBn ? item.nameBn || item.nameEn : item.nameEn}{" "}
                      <span className="text-sm font-normal text-white/80">
                        ({isBn ? item.nameEn : item.nameBn})
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#0f6b4f]/10 text-[#0f6b4f] mb-3">
                      {item.category}
                    </span>
                    <p className="text-[#6b7280] text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.descEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#ebe5dc] flex items-center justify-between">
                    <span className="text-xs text-[#6b7280] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Community Recommended
                    </span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSpot(item);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-[#0f6b4f] hover:text-[#0f6b4f] hover:bg-[#0f6b4f]/5 font-bold text-xs cursor-pointer"
                    >
                      {isBn ? "গাইড দেখুন →" : "View Guide →"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Interactive Destination Guide Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#ebe5dc] animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Hero Banner */}
            <div className="relative h-64 w-full bg-gray-100 flex-shrink-0">
              <Image
                src={selectedSpot.image}
                alt={selectedSpot.nameEn}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0f6b4f] text-white inline-block mb-2 shadow-md">
                  {selectedSpot.division} Division • {selectedSpot.district}
                </span>
                <h2 className="text-3xl font-extrabold leading-tight">
                  {isBn ? selectedSpot.nameBn || selectedSpot.nameEn : selectedSpot.nameEn}
                </h2>
                <p className="text-white/80 text-sm mt-0.5">
                  {isBn ? selectedSpot.nameEn : selectedSpot.nameBn}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f6b4f] mb-2">
                  {isBn ? "গন্তব্য পরিচিতি ও বর্ণনা" : "Destination Overview"}
                </h3>
                <p className="text-sm sm:text-base text-[#17201c]/80 leading-relaxed">
                  {selectedSpot.descEn}
                </p>
              </div>

              {selectedSpot.popularSpots && selectedSpot.popularSpots.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-3">
                    {isBn ? "জনপ্রিয় দর্শনীয় স্পটসমূহ:" : "Popular Sightseeing Spots:"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpot.popularSpots.map((spot: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f0f9f6] text-[#0f6b4f] border border-[#0f6b4f]/20 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#ebe5dc] flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/trip-planner?destination=${encodeURIComponent(selectedSpot.nameEn)}`}
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-[#0f6b4f] hover:bg-[#0c563f] text-white font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Route className="w-4 h-4" />
                    {isBn ? "ট্রিপ প্ল্যান তৈরি করুন" : "Plan Trip in Trip Planner"}
                  </Button>
                </Link>

                <Link href="/packages" className="flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full border-[#ebe5dc] text-[#17201c] hover:bg-gray-50 font-bold cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#0f6b4f]" />
                    {isBn ? "ট্যুর প্যাকেজ দেখুন" : "Browse Tour Packages"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

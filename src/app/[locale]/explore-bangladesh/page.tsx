"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Compass, MapPin, Eye, Sparkles, Filter, Navigation as NavIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, 'districts'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          nameEn: doc.data().name,
          nameBn: doc.data().bn_name,
          division: doc.data().division,
          district: doc.data().name, // Map district to name
          category: doc.data().popularSpots?.[0] || 'Tourism',
          image: doc.data().image,
          descEn: doc.data().description,
          badge: "Popular"
        }));
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
      item.nameBn.includes(searchQuery) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
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
            <span>Discover 64 Districts Across 8 Divisions</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#17201c] mb-4">
            Explore Bangladesh
          </h1>
          <p className="text-lg text-[#6b7280] leading-relaxed">
            From the tea gardens of Sylhet to the deep mangroves of Sundarbans and the hill tracts of Bandarban.
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
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
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
              placeholder="Search by spot or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full text-sm bg-white border border-[#ebe5dc] focus:outline-none focus:ring-2 focus:ring-[#0f6b4f]/40"
            />
          </div>
        </div>

        {/* Destination Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#6b7280]">Loading destinations...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="unseen-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-[#ebe5dc] group flex flex-col"
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
                      {item.nameEn} <span className="text-sm font-normal text-white/80">({item.nameBn})</span>
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#0f6b4f]/10 text-[#0f6b4f] mb-3">
                      {item.category}
                    </span>
                    <p className="text-[#6b7280] text-sm leading-relaxed mb-4">
                      {item.descEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#ebe5dc] flex items-center justify-between">
                    <span className="text-xs text-[#6b7280] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Community Recommended
                    </span>
                    <Button variant="ghost" size="sm" className="text-[#0f6b4f] hover:text-[#0f6b4f] hover:bg-[#0f6b4f]/5 font-semibold text-xs">
                      View Guide →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

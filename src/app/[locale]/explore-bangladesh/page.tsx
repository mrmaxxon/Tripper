"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
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

const DESTINATIONS = [
  {
    id: "coxs-bazar",
    nameEn: "Cox's Bazar",
    nameBn: "কক্সবাজার",
    division: "Chattogram",
    district: "Cox's Bazar",
    category: "Beach & Coastal",
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1200&auto=format&fit=crop",
    descEn: "The world's longest unbroken natural sea beach stretching over 120 km of golden sands.",
    descBn: "বিশ্বের দীর্ঘতম ১২০ কিলোমিটার অবিচ্ছিন্ন প্রাকৃতিক বালুকাময় সমুদ্র সৈকত।",
    badge: "Iconic"
  },
  {
    id: "sajek-valley",
    nameEn: "Sajek Valley",
    nameBn: "সাজেক ভ্যালি",
    division: "Chattogram",
    district: "Rangamati",
    category: "Hill & Cloudscape",
    image: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=1200&auto=format&fit=crop",
    descEn: "Known as the Queen of Hills, where you can watch clouds rolling through verdant valleys.",
    descBn: "মেঘের উপত্যকা হিসেবে পরিচিত, যেখানে পাহাড়ের চূড়া স্পর্শ করে মেঘের দল।",
    badge: "Cloud Haven"
  },
  {
    id: "srimangal",
    nameEn: "Srimangal Tea Gardens",
    nameBn: "শ্রীমঙ্গল চা বাগান",
    division: "Sylhet",
    district: "Moulvibazar",
    category: "Nature & Rainforest",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    descEn: "The tea capital of Bangladesh surrounded by Lawachara National Park and rolling green estates.",
    descBn: "বাংলাদেশের চায়ের রাজধানী, লাউয়াছড়া রেইনফরেস্ট ও সবুজ চা বাগানে ঘেরা।",
    badge: "Eco Tour"
  },
  {
    id: "sundarbans",
    nameEn: "Sundarbans Mangrove Forest",
    nameBn: "সুন্দরবন ম্যানগ্রোভ বন",
    division: "Khulna",
    district: "Bagerhat & Khulna",
    category: "Wildlife & UNESCO",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    descEn: "UNESCO World Heritage site and home to the majestic Royal Bengal Tiger and intricate tidal waterways.",
    descBn: "ইউনেস্কো বিশ্ব ঐতিহ্য ও রাজকীয় রয়েল বেঙ্গল টাইগারের বিশ্বখ্যাত প্রাকৃতিক আবাসস্থল।",
    badge: "UNESCO"
  },
  {
    id: "panam-nagar",
    nameEn: "Panam City & Sonargaon",
    nameBn: "পানাম নগর ও সোনারগাঁও",
    division: "Dhaka",
    district: "Narayanganj",
    category: "Heritage & History",
    image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?q=80&w=1200&auto=format&fit=crop",
    descEn: "A lost ancient merchant capital with colonial architecture dating back centuries.",
    descBn: "ঐতিহাসিক বণিক শহর ও বাংলার প্রাচীন রাজধানী সোনারগাঁওয়ের সংরক্ষিত স্মৃতিচিহ্ন।",
    badge: "Heritage"
  },
  {
    id: "kuakata",
    nameEn: "Kuakata Sea Beach",
    nameBn: "কুয়াকাটা সমুদ্র সৈকত",
    division: "Barishal",
    district: "Patuakhali",
    category: "Coast & Sunset",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    descEn: "Known as Sagar Kanya (Daughter of the Sea), offering views of both sunrise and sunset from the same beach.",
    descBn: "সাগরকন্যা খ্যাত অনন্য সমুদ্র সৈকত, যেখান থেকে সূর্যোদয় এবং সূর্যাস্ত দুটোই অবলোকন করা যায়।",
    badge: "Daughter of Sea"
  }
];

export default function ExploreBangladeshPage() {
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = DESTINATIONS.filter((item) => {
    const matchesDiv = selectedDivision === "All" || item.division === selectedDivision;
    const matchesQuery =
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameBn.includes(searchQuery) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiv && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-3 border border-emerald-500/20">
            <Compass className="w-4 h-4" />
            <span>Discover 64 Districts Across 8 Divisions</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Bangladesh
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            From the tea gardens of Sylhet to the deep mangroves of Sundarbans and the hill tracts of Bandarban.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-primary flex-shrink-0" />
            {DIVISIONS.map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDivision === div
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted/80 text-foreground/70 hover:bg-muted"
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
              className="w-full px-4 py-2 rounded-full text-sm bg-background border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-border/50 group flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden bg-muted">
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
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary mb-3">
                    {item.category}
                  </span>
                  <p className="text-foreground/75 text-sm leading-relaxed mb-4">
                    {item.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Community Recommended
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary font-semibold text-xs">
                    View Guide →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
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

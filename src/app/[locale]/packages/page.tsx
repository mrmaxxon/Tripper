"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Calendar, Users, MapPin, Check, ShieldCheck, Heart, Plane, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PACKAGES = [
  {
    id: "pkg-sajek-delight",
    titleEn: "Sajek Valley & Ruilui Para Cloud Retreat",
    titleBn: "সাজেক ভ্যালি ও রুইলুই পাড়া ক্লাউড রিট্রিট",
    type: "Domestic",
    duration: "3 Days / 2 Nights",
    destinations: "Sajek, Konglak Hill, Khagrachhari",
    priceBdt: 7500,
    rating: "4.9 (120 reviews)",
    image: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=1200&auto=format&fit=crop",
    features: [
      "4x4 Chander Gari transport included",
      "Resort stay facing the cloud valley",
      "Traditional indigenous BBQ dinner",
      "Guided hike to Konglak highest point"
    ]
  },
  {
    id: "pkg-sylhet-serenity",
    titleEn: "Sylhet Tea, Swamp & Crystal Lake Tour",
    titleBn: "সিলেট চা বাগান, রাতারগুল ও জাফলং ট্যুর",
    type: "Domestic",
    duration: "3 Days / 2 Nights",
    destinations: "Srimangal, Ratargul Swamp, Jaflong",
    priceBdt: 8200,
    rating: "4.8 (95 reviews)",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop",
    features: [
      "AC private transport across all spots",
      "Boat tour deep in Ratargul freshwater swamp",
      "7-color tea tasting & Lawachara walk",
      "4-star hotel stay in Sylhet City"
    ]
  },
  {
    id: "pkg-uae-dubai-escape",
    titleEn: "Dubai & Abu Dhabi Grand Discovery",
    titleBn: "দুবাই ও আবুধাবি গ্র্যান্ড ডিসকভারি",
    type: "International",
    duration: "5 Days / 4 Nights",
    destinations: "Dubai Marina, Desert Safari, Sheikh Zayed Mosque",
    priceBdt: 85000,
    rating: "5.0 (64 reviews)",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    features: [
      "UAE Tourist Visa processing assistance",
      "Desert Safari with Dune Bashing & BBQ",
      "Burj Khalifa 124th-floor observatory ticket",
      "Luxury 4-star hotel with daily breakfast"
    ]
  },
  {
    id: "pkg-sundarbans-cruise",
    titleEn: "Sundarbans Premier Forest Vessel Cruise",
    titleBn: "সুন্দরবন বিলাসবহুল ভেসেল ক্রুজ",
    type: "Domestic",
    duration: "4 Days / 3 Nights",
    destinations: "Kotka, Kochikhali, Hiron Point, Karamjal",
    priceBdt: 14500,
    rating: "4.9 (88 reviews)",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    features: [
      "AC cabin ship stay with all meals included",
      "Armed forest guard escort & naturalist guide",
      "Narrow creek canal cruising at sunrise",
      "Wildlife spotting & watchtower climb"
    ]
  }
];

export default function PackagesPage() {
  const [filter, setFilter] = useState<"All" | "Domestic" | "International">("All");

  const filtered = PACKAGES.filter(
    (p) => filter === "All" || p.type === filter
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3 border border-primary/20">
            <Plane className="w-4 h-4" />
            <span>Curated Travel Packages</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Domestic & International Tour Packages
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            All-inclusive itineraries with vetted transport, licensed guides, comfortable stays, and complete visa coordination.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-14">
          {(["All", "Domestic", "International"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === tab
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-muted text-foreground/70 hover:bg-muted/80"
              }`}
            >
              {tab} Packages
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <Image
                  src={pkg.image}
                  alt={pkg.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-primary text-white shadow-md">
                  {pkg.type}
                </span>
                <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                  {pkg.duration}
                </span>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{pkg.destinations}</span>
                  </div>
                  <h3 className="text-2xl font-bold leading-snug">{pkg.titleEn}</h3>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow justify-between space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">
                    What's Included:
                  </h4>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block">Starting From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-foreground">
                        ৳ {pkg.priceBdt.toLocaleString()}
                      </span>
                      <span className="text-xs text-foreground/60">/ person</span>
                    </div>
                  </div>

                  <Button className="rounded-full px-6 shadow-md" size="lg">
                    Book Inquiry
                    <ArrowRight className="w-4 h-4 ml-1.5" />
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

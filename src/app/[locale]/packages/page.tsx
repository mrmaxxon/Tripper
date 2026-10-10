"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Calendar, Users, MapPin, Check, ShieldCheck, Heart, Plane, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Link from "next/link";

export default function PackagesPage() {
  const [filter, setFilter] = useState<"All" | "Domestic" | "International">("All");
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const querySnapshot = await getDocs(collection(db, 'packages'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  const filtered = packages.filter(
    (p) => filter === "All" || (filter === "Domestic" && p.slug !== "uae-dubai-escape") // Basic hardcoded filter just for UI showcase
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f6b4f]/10 text-[#0f6b4f] text-sm font-semibold mb-3 border border-[#0f6b4f]/20">
            <Plane className="w-4 h-4" />
            <span>Curated Travel Packages</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#17201c] mb-4">
            Domestic & International Tour Packages
          </h1>
          <p className="text-lg text-[#6b7280] leading-relaxed">
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
                  ? "bg-[#0f6b4f] text-white shadow-lg shadow-[#0f6b4f]/25"
                  : "bg-white border border-[#ebe5dc] text-[#6b7280] hover:bg-[#f5f5f5]"
              }`}
            >
              {tab} Packages
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#6b7280]">Loading packages...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                className="unseen-card rounded-3xl overflow-hidden border border-[#ebe5dc] hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={pkg.hero_image_url}
                    alt={pkg.name_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-[#0f6b4f] text-white shadow-md">
                    Package
                  </span>
                  <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                    {pkg.duration_en}
                  </span>
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold leading-snug">{pkg.name_en}</h3>
                    <p className="text-white/80 text-sm mt-1">{pkg.name_bn}</p>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-grow justify-between space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#6b7280] mb-3">
                      What's Included:
                    </h4>
                    <ul className="space-y-2.5">
                      {pkg.highlights?.map((feat: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#17201c]/80">
                          <Check className="w-4 h-4 text-[#0f6b4f] mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[#ebe5dc] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#6b7280] block">Starting From</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#17201c]">
                          ৳ {pkg.price_bdt?.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#6b7280]">/ person</span>
                      </div>
                    </div>

                    <Link href={`/en/packages/${pkg.slug}`}>
                      <Button className="rounded-full px-6 shadow-md bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white" size="lg">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
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

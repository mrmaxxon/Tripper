import { Navigation } from "@/components/Navigation";
import { adminDb } from "@/lib/firebase/server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, Clock, Calendar, MapPin, ArrowLeft, PhoneCall } from "lucide-react";
import { Link } from "@/i18n/routing";

export const instant = false;

const FALLBACK_PACKAGES: Record<string, any> = {
  "saint-martin-retreat": {
    name_en: "Saint Martin Island Coral Retreat",
    name_bn: "সেন্টমার্টিন আইল্যান্ড কোরাল রিট্রিট",
    slug: "saint-martin-retreat",
    duration_en: "3 Days, 2 Nights",
    duration_bn: "৩ দিন, ২ রাত",
    price_bdt: 8500,
    hero_image_url: "https://images.unsplash.com/photo-1598162238318-7dc5e140cfa9?w=1200&auto=format&fit=crop",
    overview_en: "Escape to the only coral island in Bangladesh. Includes AC bus, luxury cruise ship tickets, beachfront resort stay, and guided Chera Dwip exploration.",
    overview_bn: "বাংলাদেশের একমাত্র প্রবাল দ্বীপে মনোরম অবকাশ। এসি বাস, প্রিমিয়াম ক্রুজ জাহাজ টিকিট, বিচফ্রন্ট রিসোর্ট ও ছেঁড়া দ্বীপ ভ্রমণ অন্তর্ভুক্ত।",
    highlights: [
      "AC Highway Bus & Luxury Ship Cruise",
      "Beachfront eco-resort accommodation",
      "Night seafood barbecue dinner",
      "Trolling boat tour to Chera Dwip",
      "Full tour guide assistance"
    ]
  },
  "sundarbans-safari": {
    name_en: "Sundarbans Premier Wildlife Safari",
    name_bn: "সুন্দরবন প্রিমিয়ার ওয়াইল্ডলাইফ সাফারি",
    slug: "sundarbans-safari",
    duration_en: "4 Days, 3 Nights",
    duration_bn: "৪ দিন, ৩ রাত",
    price_bdt: 12000,
    hero_image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop",
    overview_en: "Cruise through the majestic UNESCO World Heritage mangrove forest on a luxury tourist vessel with armed forest guards and naturalist experts.",
    overview_bn: "ইউনেস্কো বিশ্ব ঐতিহ্য সুন্দরবনের গভীরে বিলাসবহুল ভেসেল ক্রুজ, রয়েল বেঙ্গল টাইগার ও চিত্রা হরিণ ট্র্যাকিং এবং নদী খাল ভ্রমণ।",
    highlights: [
      "Full board AC cabin ship stay",
      "All meals including traditional local fish cuisine",
      "Kotka wildlife sanctuary & watchtower trail",
      "Armed forest department escorts",
      "Silent country boat creek cruising at dawn"
    ]
  },
  "sajek-cloud-valley": {
    name_en: "Sajek Valley Cloud Expedition",
    name_bn: "সাজেক ভ্যালি ক্লাউড এক্সপেডিশন",
    slug: "sajek-cloud-valley",
    duration_en: "2 Days, 1 Night",
    duration_bn: "২ দিন, ১ রাত",
    price_bdt: 6000,
    hero_image_url: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=1200&auto=format&fit=crop",
    overview_en: "Experience sleeping above the clouds in Sajek Valley. Includes 4x4 open-hood Chander Gari mountain drive and Konglak Peak hike.",
    overview_bn: "পাহাড়ের চূড়ায় মেঘের রাজ্যে রোমাঞ্চকর ভ্রমণ। চাঁদের গাড়িতে পাহাড়ি ড্রাইভ, কংলাক পাহাড়ের চূড়ায় আরোহণ ও পাহাড়ি উপজাতীয় খাবার।",
    highlights: [
      "Reserved 4x4 Chander Gari from Khagrachhari",
      "Top-tier cottage with balcony view of the clouds",
      "Alutila mystery cave exploration",
      "Konglak Para indigenous culture tour",
      "Indigenous Bamboo Chicken special dinner"
    ]
  }
};

export default async function PackageDetail({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const isBn = locale === "bn";

  let pkg = FALLBACK_PACKAGES[slug];

  try {
    const pkgDoc = await adminDb.collection('packages').doc(slug).get();
    if (pkgDoc && pkgDoc.exists) {
      pkg = {
        ...pkg,
        id: pkgDoc.id,
        ...pkgDoc.data()
      };
    }
  } catch (err) {
    console.warn(`[Package Detail] Error fetching slug '${slug}' from Firestore, using fallback:`, err);
  }

  if (!pkg) {
    pkg = {
      name_en: slug.replace(/-/g, ' ').toUpperCase(),
      name_bn: slug.replace(/-/g, ' '),
      slug,
      duration_en: "3 Days, 2 Nights",
      duration_bn: "৩ দিন, ২ রাত",
      price_bdt: 8500,
      hero_image_url: "https://images.unsplash.com/photo-1598162238318-7dc5e140cfa9?w=1200&auto=format&fit=crop",
      overview_en: "Curated premium travel package with verified transport, hotel stay, and licensed tour guide coordination.",
      overview_bn: "নিরাপদ যাতায়াত, মানসম্মত হোটেল ও অভিজ্ঞ গাইড সম্বলিত ট্রাভেল প্যাকেজ।",
      highlights: ["Compliant verified transport", "Hotel reservation included", "Expert guide assistance"]
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10" />
          {pkg.hero_image_url && (
            <Image
              src={pkg.hero_image_url}
              alt={isBn ? pkg.name_bn : pkg.name_en}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl">
            <Link
              href="/packages"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {isBn ? "সকল ট্যুর প্যাকেজ" : "Back to Tour Packages"}
            </Link>

            <span className="inline-block px-3.5 py-1 rounded-full bg-[#0f6b4f] text-white text-xs font-bold mb-4 shadow-md">
              {isBn ? pkg.duration_bn : pkg.duration_en}
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-tight drop-shadow-md">
              {isBn ? pkg.name_bn : pkg.name_en}
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed drop-shadow">
              {isBn ? pkg.overview_bn : pkg.overview_en}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#ebe5dc] shadow-sm p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-[#17201c]">
                {isBn ? "প্যাকেজের মূল বৈশিষ্ট্য ও অন্তর্ভুক্তি" : "Package Inclusions & Highlights"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.highlights?.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0f6b4f] flex-shrink-0 mt-0.5" />
                    <span className="text-[#17201c]/80 text-sm sm:text-base">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#ebe5dc] shadow-sm p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-[#17201c] mb-3">
                {isBn ? "ট্রিপার নিশ্চয়তা" : "The Tripper Guarantee"}
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                {isBn
                  ? "আমাদের প্রতিটি ট্যুরে থাকে প্রি-ভেরিফাইড যানবাহন, নিরাপত্তা বেষ্টনী এবং অভিজ্ঞ লোকাল গাইড যাতে আপনি কোনো চিন্তা ছাড়াই ছুটির দিন উপভোগ করতে পারেন।"
                  : "All our tour packages include vetted private/group transport, comfortable accommodations, and responsive support teams on ground."}
              </p>
            </div>
          </div>
          
          {/* Sidebar / Quick Stats */}
          <div className="space-y-6">
            <div className="unseen-card border border-[#ebe5dc] p-6 rounded-2xl">
              <h3 className="font-bold text-base text-[#17201c] mb-2">
                {isBn ? "প্যাকেজ মূল্য" : "Package Price"}
              </h3>
              <p className="text-4xl font-extrabold text-[#0f6b4f] mb-1">
                ৳ {pkg.price_bdt?.toLocaleString()}
              </p>
              <p className="text-xs text-[#6b7280] mb-6">
                {isBn ? "জনপ্রতি (অল ইনক্লুসিভ)" : "per person (All Inclusive)"}
              </p>
              <Button size="lg" className="w-full rounded-full bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white border-0 shadow-md">
                {isBn ? "এখনই বুক করুন" : "Book This Tour"}
              </Button>
            </div>
            
            <div className="bg-[#f0f9f6] border border-[#0f6b4f]/20 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2 text-[#0f6b4f]">
                {isBn ? "কাস্টমাইজ করতে চান?" : "Custom Itinerary?"}
              </h3>
              <p className="text-sm text-[#17201c]/80 mb-5 leading-relaxed">
                {isBn
                  ? "আপনার পরিবার বা বন্ধুদের গ্রুপের জন্য আলাদা পরিকল্পনা দরকার? আমাদের সাথে কথা বলুন।"
                  : "Need a custom private trip for family or corporate groups? We tailor every detail."}
              </p>
              <Button variant="outline" className="w-full rounded-full border-[#0f6b4f] text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white font-semibold">
                <PhoneCall className="w-4 h-4 mr-2" />
                {isBn ? "যোগাযোগ করুন" : "Contact Trip Planner"}
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

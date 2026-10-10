import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { Compass, MapPin, Globe2, FileCheck, ArrowRight, Sparkles, ShieldCheck, Map, Users, Heart, Camera } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FadeIn, FadeInStagger, FadeInStaggerItem, Float } from "@/components/AnimatedElements";

export const instant = false;

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === "bn";

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      {/* Hero Section styled directly after Unseen Bangladesh */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Viral Badge */}
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3f0ea] border border-[#0f6b4f]/25 text-[#0f6b4f] text-xs sm:text-sm font-bold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span>{isBn ? "৬৪ জেলার ২৪০+ দর্শনীয় স্থান ও ব্যক্তিগত ভ্রমণ ম্যাপ" : "Discover 64 Districts, 240+ Places & Personal Travel Map"}</span>
          </div>
        </FadeIn>

        {/* Dynamic Gradient Title */}
        <FadeIn delay={0.2}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#17201c] max-w-4xl mx-auto leading-[1.15] mb-6">
            {isBn ? (
              <>
                বাংলাদেশের সৌন্দর্য থেকে <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0f6b4f] via-[#10b981] to-[#e11d48] bg-clip-text text-transparent">
                  সারা বিশ্বের দিগন্তে।
                </span>
              </>
            ) : (
              <>
                From the Beauty of Bangladesh <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0f6b4f] via-[#10b981] to-[#e11d48] bg-clip-text text-transparent">
                  To the Entire World.
                </span>
              </>
            )}
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg sm:text-xl text-[#6b7280] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {isBn
              ? "নিজের ভ্রমণের জেলাগুলো মার্ক করুন, লুকানো রত্নগুলো খুঁজে নিন, আর বিশ্বভ্রমণের জন্য বিশ্বস্ত ভিসা ও আইনি নথিপত্রের সমাধান পান এক ঠিকানায়।"
              : "Mark the districts you have explored, discover authentic hidden gems, and get seamless international visa processing & certified document services."}
          </p>
        </FadeIn>

        {/* Action CTAs */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
            <Link href="/explore-bangladesh">
              <button className="px-8 py-4 rounded-full bg-[#17201c] hover:bg-[#0f6b4f] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                {isBn ? "বাংলাদেশ ম্যাপ ও দর্শনীয় স্থান" : "Explore Bangladesh Map"}
              </button>
            </Link>

            <Link href="/trip-planner">
              <button className="px-8 py-4 rounded-full bg-white hover:bg-[#f3efe7] text-[#17201c] border-2 border-[#ebe5dc] font-bold text-base shadow-md hover:border-[#17201c] transition-all flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#2563eb]" />
                {isBn ? "স্মার্ট ট্রিপ প্ল্যানার ও বাজেট" : "Smart Trip Planner (BDT)"}
              </button>
            </Link>

            <Link href="/visa-services">
              <button className="px-8 py-4 rounded-full bg-[#0f6b4f] hover:bg-[#0c563f] text-white font-bold text-base shadow-lg shadow-[#0f6b4f]/25 transition-all flex items-center gap-2">
                <Globe2 className="w-5 h-5" />
                {isBn ? "আন্তর্জাতিক ভিসা সহায়তা" : "Global Visa Assistance"}
              </button>
            </Link>
          </div>
        </FadeIn>

        {/* Cinematic Visual Banner (Sajek & Bangladesh Landscapes) */}
        <FadeIn delay={0.5}>
          <div className="relative w-full rounded-3xl overflow-hidden border border-[#ebe5dc] shadow-2xl mx-auto max-w-6xl aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=2000&auto=format&fit=crop"
              alt="Sajek Valley Bangladesh"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row justify-between sm:items-end text-white text-left gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2 inline-block border border-white/25">
                  {isBn ? "ফিচার্ড গন্তব্য" : "Featured Destination"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold drop-shadow-md">
                  {isBn ? "সাজেক ভ্যালি — মেঘের দেশ, রাঙ্গামাটি" : "Sajek Valley — Kingdom of Clouds, Rangamati"}
                </h2>
                <p className="text-white/80 text-sm sm:text-base max-w-xl drop-shadow mt-1">
                  {isBn
                    ? "পাহাড়ের বাঁকে বাঁকে মেঘের খেলা আর আদিবাসী জীবনের নিবিড় সান্নিধ্য।"
                    : "Experience rolling morning clouds and emerald green hills across the Chittagong Hill Tracts."}
                </p>
              </div>

              <Link href="/explore-bangladesh">
                <button className="px-5 py-2.5 rounded-full bg-white text-[#17201c] font-bold text-xs sm:text-sm hover:bg-[#0f6b4f] hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto">
                  {isBn ? "গাইড দেখুন" : "View Full Guide"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 4 Core Pillars Grid (Liquid Glass / Unseen Bangladesh Style) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0f6b4f] block mb-2">
            {isBn ? "আমাদের মূল পরিষেবাসমূহ" : "Complete Platform Features"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17201c]">
            {isBn ? "ভ্রমণ পরিকল্পনা ও আন্তর্জাতিক সংযোগের মেলবন্ধন" : "Built for Explorers, Travelers & Global Achievers"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Tourism */}
          <Link href="/explore-bangladesh" className="unseen-card p-7 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e3f0ea] text-[#0f6b4f] flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#0f6b4f] uppercase tracking-wider block mb-1">
                {isBn ? "৮ বিভাগ ও ৬৪ জেলা" : "64 District Guides"}
              </span>
              <h3 className="text-xl font-bold text-[#17201c] mb-3">
                {isBn ? "বাংলাদেশ এক্সপ্লোরার" : "Bangladesh Tourism"}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {isBn
                  ? "কক্সবাজারের সমুদ্র সৈকত থেকে শুরু করে শ্রীমঙ্গলের চা বাগান ও সুন্দরবনের ম্যানগ্রোভের বিস্তারিত গাইড।"
                  : "Explore popular landmarks, seasonal attractions, and authentic community gems across Bangladesh."}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#ebe5dc] flex items-center text-xs font-bold text-[#0f6b4f]">
              {isBn ? "স্থানসমূহ দেখুন →" : "Explore Places →"}
            </div>
          </Link>

          {/* Card 2: Visa Services */}
          <Link href="/visa-services" className="unseen-card p-7 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                {isBn ? "লাইভ ফায়ারবেস ডেটাবেস" : "Cloud Integrated"}
              </span>
              <h3 className="text-xl font-bold text-[#17201c] mb-3">
                {isBn ? "ভিসা প্রসেসিং ও সহায়তা" : "Global Visa Assistance"}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {isBn
                  ? "ইউএই, ভারত, যুক্তরাজ্য, যুক্তরাষ্ট্র ও অন্যান্য দেশের পর্যটন ও চিকিৎসা ভিসার পূর্ণাঙ্গ প্রসেসিং গাইড।"
                  : "Reliable visa guidance, embassy interview prep, and documentation for UAE, UK, US, India, and more."}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#ebe5dc] flex items-center text-xs font-bold text-blue-600">
              {isBn ? "ভিসা দেশসমূহ দেখুন →" : "Check Countries →"}
            </div>
          </Link>

          {/* Card 3: Document Services */}
          <Link href="/document-services" className="unseen-card p-7 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
                {isBn ? "আইনি ও প্রামাণিক" : "Legal & Attestation"}
              </span>
              <h3 className="text-xl font-bold text-[#17201c] mb-3">
                {isBn ? "নোটারি ও নথিপত্র সেবা" : "Notary & Apostille"}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {isBn
                  ? "পররাষ্ট্র মন্ত্রণালয় (MOFA) সত্যায়ন, নোটারি পাবলিক, দূতাবাস সত্যায়ন ও প্রত্যয়িত অনুবাদ সেবা।"
                  : "Ministry attestation, sworn multi-language translations, notary seals, and apostille validation."}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#ebe5dc] flex items-center text-xs font-bold text-teal-600">
              {isBn ? "সেবা তালিকা দেখুন →" : "View Services →"}
            </div>
          </Link>

          {/* Card 4: Trip Planner */}
          <Link href="/trip-planner" className="unseen-card p-7 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                {isBn ? "স্মার্ট হিসাবনিকাশ" : "Live BDT Estimates"}
              </span>
              <h3 className="text-xl font-bold text-[#17201c] mb-3">
                {isBn ? "ট্রিপ প্ল্যানার ও বাজেট" : "Smart Trip Planner"}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {isBn
                  ? "আপনার ভ্রমণের দিন, যাত্রী সংখ্যা এবং হোটেল ক্যাটাগরি অনুযায়ী অটোমেটিক বাজেট ও রুট হিসাব করুন।"
                  : "Build custom multi-day schedules and compute real-time accommodation, food, and transit budgets in Taka."}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#ebe5dc] flex items-center text-xs font-bold text-amber-600">
              {isBn ? "প্ল্যান তৈরি করুন →" : "Build Itinerary →"}
            </div>
          </Link>

        </div>
      </section>

      {/* Trust & Community Banner */}
      <section className="py-16 bg-[#f3efe7]/70 border-y border-[#ebe5dc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0f6b4f] block">৬৪</span>
            <span className="text-xs sm:text-sm font-semibold text-[#6b7280] mt-1 block">
              {isBn ? "জেলা কভার করা" : "Districts Covered"}
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-[#17201c] block">২৪০+</span>
            <span className="text-xs sm:text-sm font-semibold text-[#6b7280] mt-1 block">
              {isBn ? "দর্শনীয় পর্যটন কেন্দ্র" : "Verified Destinations"}
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-[#2563eb] block">১০০%</span>
            <span className="text-xs sm:text-sm font-semibold text-[#6b7280] mt-1 block">
              {isBn ? "সরকারি বিধিবদ্ধ নিয়ম মানা" : "Consular Compliance"}
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 block">২৪/৭</span>
            <span className="text-xs sm:text-sm font-semibold text-[#6b7280] mt-1 block">
              {isBn ? "ভ্রমণ সহায়তা" : "Travel Assistance"}
            </span>
          </div>
        </div>
      </section>


    </div>
  );
}

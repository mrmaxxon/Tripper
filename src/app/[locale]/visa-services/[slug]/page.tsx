import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { adminDb } from "@/lib/firebase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

import { connection } from "next/server";

export const instant = false;

export default async function VisaCountryDetail({ 
  params 
}: { 
  params: Promise<{locale: string, slug: string}> 
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("VisaServices");

  await connection();
  // Fetch the specific country from Firestore
  const countryDoc = await adminDb.collection('visa_countries').doc(slug).get();
  
  if (!countryDoc.exists) {
    notFound();
  }

  const country = { id: countryDoc.id, ...countryDoc.data() } as any;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          {country.hero_image_url && (
            <Image
              src={country.hero_image_url}
              alt={locale === 'bn' ? country.name_bn : country.name_en}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
              {locale === 'bn' ? country.name_bn : country.name_en}
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed drop-shadow">
              {locale === 'bn' ? country.overview_bn : country.overview_en}
            </p>
            <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-lg bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white border-0">
              {locale === 'bn' ? 'ভিসার জন্য আবেদন করুন' : 'Apply for Visa'}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#ebe5dc] shadow-sm p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-[#17201c]">
                {locale === 'bn' ? 'ভিসার প্রয়োজনীয়তা' : 'Visa Requirements'}
              </h2>
              <ul className="space-y-4 text-[#6b7280] list-disc list-inside">
                <li>{locale === 'bn' ? 'কমপক্ষে ৬ মাস মেয়াদ থাকা বৈধ পাসপোর্ট' : 'Valid passport with at least 6 months validity'}</li>
                <li>{locale === 'bn' ? 'সাম্প্রতিক পাসপোর্ট সাইজ ছবি' : 'Recent passport-sized photographs'}</li>
                <li>{locale === 'bn' ? 'ভ্রমণপথ এবং ফ্লাইট বুকিং' : 'Travel itinerary and flight bookings'}</li>
                <li>{locale === 'bn' ? 'আর্থিক স্বচ্ছলতার প্রমাণ (ব্যাংক স্টেটমেন্ট)' : 'Proof of financial means (Bank statements)'}</li>
              </ul>
            </div>
          </div>
          
          {/* Sidebar / Quick Stats */}
          <div className="space-y-6">
            <div className="unseen-card border border-[#ebe5dc] p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4 text-[#17201c]">{locale === 'bn' ? 'প্রসেসিং সময়' : 'Processing Time'}</h3>
              <p className="text-3xl font-semibold text-[#0f6b4f] mb-1">5 - 7</p>
              <p className="text-[#6b7280]">{locale === 'bn' ? 'কর্মদিবস' : 'Business Days'}</p>
            </div>
            
            <div className="bg-[#f0f9f6] border border-[#0f6b4f]/20 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4 text-[#0f6b4f]">{locale === 'bn' ? 'সাহায্য দরকার?' : 'Need Help?'}</h3>
              <p className="text-[#17201c]/80 mb-6">
                {locale === 'bn' ? 'আমাদের ভিসা বিশেষজ্ঞরা আপনার আবেদন প্রস্তুত করতে সহায়তা করার জন্য প্রস্তুত।' : 'Our visa experts are ready to assist you with preparing your application.'}
              </p>
              <Button variant="outline" className="w-full rounded-full border-[#0f6b4f] text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white">
                {locale === 'bn' ? 'বিশেষজ্ঞের সাথে কথা বলুন' : 'Talk to an Expert'}
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { adminDb } from "@/lib/firebase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { connection } from "next/server";
import { Check, Clock, Calendar, MapPin } from "lucide-react";

export const instant = false;

export default async function PackageDetail({ 
  params 
}: { 
  params: Promise<{locale: string, slug: string}> 
}) {
  const { locale, slug } = await params;
  
  await connection();
  const pkgDoc = await adminDb.collection('packages').doc(slug).get();
  
  if (!pkgDoc.exists) {
    notFound();
  }

  const pkg = { id: pkgDoc.id, ...pkgDoc.data() } as any;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          {pkg.hero_image_url && (
            <Image
              src={pkg.hero_image_url}
              alt={locale === 'bn' ? pkg.name_bn : pkg.name_en}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0f6b4f] text-white text-sm font-semibold mb-6 shadow-md">
              {locale === 'bn' ? pkg.duration_bn : pkg.duration_en}
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
              {locale === 'bn' ? pkg.name_bn : pkg.name_en}
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed drop-shadow">
              {locale === 'bn' ? pkg.overview_bn : pkg.overview_en}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#ebe5dc] shadow-sm p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-[#17201c]">
                {locale === 'bn' ? 'প্যাকেজ হাইলাইটস' : 'Package Highlights'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.highlights?.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0f6b4f] flex-shrink-0 mt-0.5" />
                    <span className="text-[#6b7280]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar / Quick Stats */}
          <div className="space-y-6">
            <div className="unseen-card border border-[#ebe5dc] p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4 text-[#17201c]">{locale === 'bn' ? 'প্যাকেজ মূল্য' : 'Package Price'}</h3>
              <p className="text-4xl font-extrabold text-[#0f6b4f] mb-1">৳ {pkg.price_bdt?.toLocaleString()}</p>
              <p className="text-[#6b7280] mb-6">{locale === 'bn' ? 'জনপ্রতি' : 'per person'}</p>
              <Button size="lg" className="w-full rounded-full bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white border-0 shadow-md">
                {locale === 'bn' ? 'বুকিং করুন' : 'Book Now'}
              </Button>
            </div>
            
            <div className="bg-[#f0f9f6] border border-[#0f6b4f]/20 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4 text-[#0f6b4f]">{locale === 'bn' ? 'সাহায্য দরকার?' : 'Need Help?'}</h3>
              <p className="text-[#17201c]/80 mb-6">
                {locale === 'bn' ? 'আমাদের বিশেষজ্ঞরা আপনার ট্যুর প্ল্যান করতে প্রস্তুত।' : 'Our experts are ready to help plan your tour.'}
              </p>
              <Button variant="outline" className="w-full rounded-full border-[#0f6b4f] text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white">
                {locale === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { adminDb } from "@/lib/firebase/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";

import { connection } from 'next/server';

export const instant = false;

export default async function VisaServices({ params }: { params: Promise<{locale: string}> }) {
  const { locale } = await params;
  const t = await getTranslations("VisaServices");

  await connection();
  // Fetch all published visa countries from Firestore
  const countriesSnapshot = await adminDb
    .collection('visa_countries')
    .where('is_published', '==', true)
    .get();

  const countries = countriesSnapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country: any) => (
            <Link key={country.id} href={`/visa-services/${country.slug}`} className="block group">
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50">
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  {country.hero_image_url && (
                    <Image
                      src={country.hero_image_url}
                      alt={locale === 'bn' ? country.name_bn : country.name_en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                    {locale === 'bn' ? country.name_bn : country.name_en}
                  </h2>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-foreground/80 line-clamp-3 mb-4">
                    {locale === 'bn' ? country.overview_bn : country.overview_en}
                  </p>
                  <div className="mt-auto text-primary font-semibold flex items-center">
                    {t("viewDetails")} →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-foreground text-background py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="font-bold text-2xl">Trip<span className="text-primary">per</span></div>
          <p className="text-background/60">© 2026 Tripper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { FileCheck, Stamp, Languages, Globe2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export const instant = false;

export default async function DocumentServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("DocumentServices");

  const services = [
    {
      id: "notary",
      icon: Stamp,
      titleEn: "Notary Public Coordination",
      titleBn: "নোটারি পাবলিক সমন্বয়",
      descEn: "Attestation and legal certification for birth, marriage, educational, and commercial records.",
      descBn: "জন্ম, বিবাহ, শিক্ষাগত ও বাণিজ্যিক সনদের নোটারি সত্যায়ন ও আইনি প্রমাণীকরণ।",
      badge: "Fast 24-48h"
    },
    {
      id: "apostille",
      icon: Globe2,
      titleEn: "Apostille & Ministry Attestation",
      titleBn: "অ্যাপোস্টিল ও মন্ত্রণালয় সত্যায়ন",
      descEn: "Ministry of Foreign Affairs (MOFA), Education Ministry, and Home Ministry endorsement services.",
      descBn: "পররাষ্ট্র মন্ত্রণালয়, শিক্ষা মন্ত্রণালয় এবং স্বরাষ্ট্র মন্ত্রণালয় থেকে প্রামাণিক সত্যায়ন।",
      badge: "Official Stamp"
    },
    {
      id: "translation",
      icon: Languages,
      titleEn: "Certified Legal Translation",
      titleBn: "প্রত্যয়িত আইনি অনুবাদ",
      descEn: "Sworn translations in English, Arabic, French, German, Italian, and Japanese with notary stamps.",
      descBn: "ইংরেজি, আরবি, ফরাসি, জার্মান ও জাপানি ভাষায় অনুমোদিত অনুবাদক দ্বারা অনুবাদ।",
      badge: "Sworn Translators"
    },
    {
      id: "embassy",
      icon: ShieldCheck,
      titleEn: "Embassy Legalization",
      titleBn: "দূতাবাস বৈধকরণ ও লিগ্যালাইজেশন",
      descEn: "Document submission and verification before Schengen, Gulf, and North American embassies.",
      descBn: "বিভিন্ন দেশের দূতাবাসের চাহিদামাফিক নথি যাচাই ও অনুমোদন সহায়তা।",
      badge: "Compliant"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-4 border border-teal-500/20">
            <FileCheck className="w-4 h-4" />
            {locale === "bn" ? "আইনি ও নথিপত্র সহায়তা" : "Legal & Document Services"}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all border border-border/50 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-foreground/80 border">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {locale === "bn" ? item.titleBn : item.titleEn}
                  </h3>
                  <p className="text-foreground/75 leading-relaxed mb-6">
                    {locale === "bn" ? item.descBn : item.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                  <span className="text-sm text-foreground/60">
                    {locale === "bn" ? "প্রক্রিয়াকরণ: ২-৪ কার্যদিবস" : "Turnaround: 2-4 business days"}
                  </span>
                  <Link href="/track-request">
                    <Button variant="outline" size="sm" className="rounded-full">
                      {locale === "bn" ? "আবেদন জমা দিন" : "Submit Request"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guarantee Card */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-primary/20">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {locale === "bn"
              ? "জরুরি অনুবাদ ও নোটারি প্রয়োজন?"
              : "Need Urgent Express Notarization & Attestation?"}
          </h2>
          <p className="text-foreground/75 max-w-2xl mx-auto mb-6">
            {locale === "bn"
              ? "আমাদের অভিজ্ঞ লিগ্যাল টিম আপনার নথিগুলোর সর্বোচ্চ গোপনীয়তা ও নির্ভুলতা নিশ্চিত করে দ্রুত ডেলিভারি প্রদান করে।"
              : "Our accredited legal desk coordinates direct appointments, official MOFA submissions, and apostille validation with end-to-end chain of custody."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/track-request">
              <Button size="lg" className="rounded-full px-8">
                {t("getStarted")}
              </Button>
            </Link>
            <Link href="/visa-services">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                {locale === "bn" ? "ভিসা দেশসমূহ দেখুন" : "Explore Visa Requirements"}
              </Button>
            </Link>
          </div>
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

"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FileCheck, Stamp, Languages, Globe2, ShieldCheck, ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { ActionModal } from "@/components/ActionModal";

export default function DocumentServicesPage() {
  const locale = useLocale();
  const t = useTranslations("DocumentServices");
  const isBn = locale === "bn";
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navigation />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f6b4f]/10 text-[#0f6b4f] text-sm font-semibold mb-4 border border-[#0f6b4f]/20">
            <FileCheck className="w-4 h-4" />
            {isBn ? "আইনি ও নথিপত্র সহায়তা" : "Legal & Document Services"}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#17201c] mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-[#6b7280] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((item) => {
            const Icon = item.icon;
            const title = isBn ? item.titleBn : item.titleEn;
            return (
              <div
                key={item.id}
                onClick={() => handleOpenService(title)}
                className="unseen-card rounded-2xl p-8 hover:shadow-xl transition-all border border-[#ebe5dc] relative overflow-hidden flex flex-col justify-between group cursor-pointer active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-xl bg-[#0f6b4f]/10 text-[#0f6b4f] group-hover:bg-[#0f6b4f] group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f5f5f5] text-[#6b7280] border border-[#ebe5dc]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#17201c] mb-3 group-hover:text-[#0f6b4f] transition-colors">
                    {title}
                  </h3>
                  <p className="text-[#6b7280] leading-relaxed mb-6">
                    {isBn ? item.descBn : item.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ebe5dc] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0f6b4f]">
                    {isBn ? "সেবা অনুরোধ করুন" : "Request Service"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#0f6b4f] opacity-60 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="bg-[#f0f9f6] border border-[#0f6b4f]/20 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#17201c] mb-4">
            {isBn ? "জটিল নথিপত্র? আমাদের উপর ছেড়ে দিন।" : "Complex Paperwork? Leave it to us."}
          </h2>
          <p className="text-[#6b7280] mb-8 max-w-xl">
            {isBn
              ? "নিরাপদ, দ্রুত এবং সম্পূর্ণ আইনিভাবে আমরা আপনার সমস্ত নথিপত্র প্রস্তুত করব।"
              : "Secure, fast, and fully legally compliant. We'll handle your document preparation start to finish."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              onClick={() => handleOpenService(isBn ? "নথিপত্র সেবা" : "Document Service")}
              size="lg"
              className="rounded-full px-8 bg-[#0f6b4f] hover:bg-[#0f6b4f]/90 text-white border-0 shadow-md font-bold cursor-pointer active:scale-95 transition-all"
            >
              {isBn ? "রিকোয়েস্ট সাবমিট করুন" : "Submit Request"}
            </Button>
            <a href="tel:+8801700000000">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-[#0f6b4f] text-[#0f6b4f] hover:bg-[#0f6b4f] hover:text-white cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                {isBn ? "আমাদের কল করুন" : "Call Us Now"}
              </Button>
            </a>
          </div>
        </div>
      </main>

      {/* Action Modal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedService || (isBn ? "নথিপত্র সেবা অনুরোধ" : "Document Service Request")}
        subtitle={isBn ? "সত্যায়ন, নোটারাইজেশন ও অনুবাদ সেবা" : "Attestation, translation & notarization"}
        serviceType="document"
        initialData={{
          name: selectedService || "Document Service",
        }}
        locale={locale}
      />
    </div>
  );
}

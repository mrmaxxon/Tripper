"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Globe, Menu, X, Compass, MapPin, FileCheck, Shield, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

import Image from "next/image";

export function Navigation() {
  const t = useTranslations("Navigation");
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "bn" ? "en" : "bn";
    router.replace(pathname, { locale: nextLocale });
  };

  const isBn = currentLocale === "bn";

  return (
    <nav className="fixed w-full z-50 unseen-glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group py-1">
            <Image
              src="/logo.png"
              alt="Tripper - Travel & Explore"
              width={160}
              height={52}
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Center Nav Pills (Inspired by Unseen Bangladesh) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#f3efe7]/90 p-1.5 rounded-full border border-[#ebe5dc]">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                pathname === "/" || pathname === "/en" || pathname === "/bn"
                  ? "bg-white text-[#17201c] shadow-sm"
                  : "text-[#6b7280] hover:text-[#17201c]"
              }`}
            >
              {t("home")}
            </Link>

            <Link
              href="/explore-bangladesh"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname.includes("explore-bangladesh")
                  ? "bg-white text-[#0f6b4f] shadow-sm"
                  : "text-[#6b7280] hover:text-[#17201c]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#0f6b4f]" />
              {t("exploreBangladesh")}
            </Link>

            <Link
              href="/trip-planner"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname.includes("trip-planner")
                  ? "bg-white text-[#2563eb] shadow-sm"
                  : "text-[#6b7280] hover:text-[#17201c]"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
              {t("tripPlanner")}
            </Link>

            <Link
              href="/visa-services"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                pathname.includes("visa-services")
                  ? "bg-white text-[#17201c] shadow-sm"
                  : "text-[#6b7280] hover:text-[#17201c]"
              }`}
            >
              {t("visaServices")}
            </Link>

            <Link
              href="/document-services"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname.includes("document-services")
                  ? "bg-white text-[#0f9d8a] shadow-sm"
                  : "text-[#6b7280] hover:text-[#17201c]"
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-[#0f9d8a]" />
              {t("documentServices")}
            </Link>

            <Link
              href="/packages"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                pathname.includes("packages")
                  ? "bg-white text-[#17201c] shadow-sm"
                  : "text-[#6b7280] hover:text-[#17201c]"
              }`}
            >
              {t("packages")}
            </Link>

            <Link
              href="/track-request"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname.includes("track-request")
                  ? "bg-white text-[#d97706] shadow-sm"
                  : "text-[#6b7280] hover:text-[#17201c]"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#d97706]" />
              {t("trackRequest")}
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ebe5dc] bg-white text-xs font-bold text-[#17201c] hover:border-[#17201c] transition-colors shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-[#0f6b4f]" />
              <span>{isBn ? "English" : "বাংলা"}</span>
            </button>

            <Link href="/login">
              <button className="px-5 py-2 rounded-full bg-[#17201c] hover:bg-[#0f6b4f] text-white text-xs font-bold transition-all shadow-md">
                {t("login")}
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#ebe5dc] bg-white text-xs font-bold text-[#17201c]"
            >
              <Globe className="w-3 h-3 text-[#0f6b4f]" />
              <span>{isBn ? "EN" : "বাং"}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#17201c] hover:text-[#0f6b4f] focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-[#ebe5dc] shadow-2xl py-6 animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-md mx-auto px-6 space-y-3 flex flex-col font-medium text-sm">
            <Link onClick={() => setIsOpen(false)} href="/" className="py-2 text-[#17201c] font-bold border-b border-[#ebe5dc]/60">{t("home")}</Link>
            <Link onClick={() => setIsOpen(false)} href="/explore-bangladesh" className="py-2 text-[#0f6b4f] font-bold border-b border-[#ebe5dc]/60 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              {t("exploreBangladesh")}
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/trip-planner" className="py-2 text-[#2563eb] font-bold border-b border-[#ebe5dc]/60 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t("tripPlanner")}
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/visa-services" className="py-2 text-[#17201c] border-b border-[#ebe5dc]/60">{t("visaServices")}</Link>
            <Link onClick={() => setIsOpen(false)} href="/document-services" className="py-2 text-[#0f9d8a] border-b border-[#ebe5dc]/60">{t("documentServices")}</Link>
            <Link onClick={() => setIsOpen(false)} href="/packages" className="py-2 text-[#17201c] border-b border-[#ebe5dc]/60">{t("packages")}</Link>
            <Link onClick={() => setIsOpen(false)} href="/track-request" className="py-2 text-[#d97706] border-b border-[#ebe5dc]/60">{t("trackRequest")}</Link>
            <Link onClick={() => setIsOpen(false)} href="/login" className="pt-2">
              <button className="w-full py-2.5 rounded-full bg-[#17201c] text-white font-bold text-center">
                {t("login")}
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export function AnimatedFooter({ isBn }: { isBn: boolean }) {
  return (
    <footer className="relative bg-[#eef4ec] pt-24 mt-auto overflow-hidden">
      {/* Animated Landscape Scene */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none overflow-hidden">
        {/* Clouds */}
        <motion.div
          animate={{ x: ["-10%", "100%"] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute top-4 left-0 w-32 h-10 bg-white/40 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: ["-20%", "100%"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear", delay: 10 }}
          className="absolute top-12 left-20 w-48 h-12 bg-white/30 rounded-full blur-xl"
        />

        {/* Birds */}
        <motion.div
          animate={{ x: ["-10vw", "110vw"], y: [0, -20, 0] }}
          transition={{ x: { repeat: Infinity, duration: 25, ease: "linear" }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
          className="absolute top-8 left-0 text-[#17201c]/40 text-xl font-serif"
        >
          ~ ~
        </motion.div>
        
        {/* Sun/Moon */}
        <div className="absolute top-4 right-[20%] w-12 h-12 rounded-full bg-[#f59e0b]/20 blur-sm" />
        <div className="absolute top-5 right-[20%] w-10 h-10 rounded-full bg-[#f59e0b]/40 translate-x-1" />

        {/* River Water Line */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#c9e7d6] to-transparent" />
        
        {/* Animated Boat */}
        <motion.div
          animate={{ x: ["-5vw", "105vw"], rotate: [-2, 2, -2] }}
          transition={{ x: { repeat: Infinity, duration: 35, ease: "linear" }, rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
          className="absolute bottom-2 left-0 text-3xl opacity-80"
        >
          ⛵
        </motion.div>
        
        <motion.div
          animate={{ x: ["105vw", "-5vw"], rotate: [2, -2, 2] }}
          transition={{ x: { repeat: Infinity, duration: 50, ease: "linear" }, rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
          className="absolute bottom-6 left-0 text-xl opacity-60 scale-x-[-1]"
        >
          🛶
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-8 pb-10 border-b border-[#0f6b4f]/10">
        <div className="text-center md:text-left">
          <span className="font-extrabold text-3xl tracking-tight block text-[#17201c]">
            Trip<span className="text-[#0f6b4f]">per</span>
          </span>
          <p className="text-sm text-[#6b7280] mt-2 max-w-sm font-semibold">
            {isBn
              ? "বাংলাদেশের সৌন্দর্য থেকে সারা বিশ্বে। নির্ভরযোগ্য ভিসা, নথিপত্র এবং ট্রিপ প্ল্যানিং।"
              : "From the beauty of Bangladesh to the world. Reliable tourism, visa, and document services."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm font-bold text-[#17201c]">
          <div className="flex flex-col gap-3">
            <h4 className="text-[#0f6b4f] mb-1">{isBn ? "ভ্রমণ" : "Travel"}</h4>
            <Link href="/explore-bangladesh" className="hover:text-[#0f6b4f] transition-colors">Explore Bangladesh</Link>
            <Link href="/trip-planner" className="hover:text-[#0f6b4f] transition-colors">Trip Planner</Link>
            <Link href="/packages" className="hover:text-[#0f6b4f] transition-colors">Tour Packages</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-[#0f6b4f] mb-1">{isBn ? "সেবা" : "Services"}</h4>
            <Link href="/visa-services" className="hover:text-[#0f6b4f] transition-colors">Visa Services</Link>
            <Link href="/document-services" className="hover:text-[#0f6b4f] transition-colors">Document Services</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-[#0f6b4f] mb-1">{isBn ? "সাপোর্ট" : "Support"}</h4>
            <Link href="/track-request" className="hover:text-[#0f6b4f] transition-colors">Track Request</Link>
            <Link href="/login" className="hover:text-[#0f6b4f] transition-colors">Sign In</Link>
          </div>
        </div>
      </div>
      
      <div className="bg-[#eef4ec]">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs font-semibold text-[#6b7280]">
          © 2026 Tripper. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

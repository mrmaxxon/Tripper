const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

process.loadEnvFile('.env.local');

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seed() {
  console.log("Seeding more Visa Countries...");
  const moreCountries = [
    {
      name_en: "Thailand",
      name_bn: "থাইল্যান্ড",
      slug: "thailand",
      hero_image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop",
      overview_en: "Explore beautiful beaches and vibrant cities. We provide hassle-free Thailand tourist visa processing.",
      overview_bn: "সুন্দর সমুদ্র সৈকত এবং প্রাণবন্ত শহর ঘুরে দেখুন। আমরা থাইল্যান্ডের ট্যুরিস্ট ভিসা সহজে প্রসেস করি।",
      is_published: true,
      created_at: new Date()
    },
    {
      name_en: "Singapore",
      name_bn: "সিঙ্গাপুর",
      slug: "singapore",
      hero_image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop",
      overview_en: "Experience the futuristic city-state of Singapore. Fast e-visa processing for eligible travelers.",
      overview_bn: "ভবিষ্যতমুখী শহর-রাজ্য সিঙ্গাপুরের অভিজ্ঞতা নিন। যোগ্য ভ্রমণকারীদের জন্য দ্রুত ই-ভিসা প্রসেসিং।",
      is_published: true,
      created_at: new Date()
    },
    {
      name_en: "Malaysia",
      name_bn: "মালয়েশিয়া",
      slug: "malaysia",
      hero_image_url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop",
      overview_en: "Truly Asia awaits. Get your Malaysian e-visa or sticker visa processed with our expert team.",
      overview_bn: "সত্যিকারের এশিয়া আপনার অপেক্ষায়। আমাদের বিশেষজ্ঞ দলের সাথে মালয়েশিয়ার ই-ভিসা বা স্টিকার ভিসা প্রসেস করুন।",
      is_published: true,
      created_at: new Date()
    },
    {
      name_en: "Saudi Arabia",
      name_bn: "সৌদি আরব",
      slug: "saudi-arabia",
      hero_image_url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1200&auto=format&fit=crop",
      overview_en: "Umrah, Hajj, and tourist visa assistance for the Kingdom of Saudi Arabia.",
      overview_bn: "সৌদি আরবের জন্য ওমরাহ, হজ এবং ট্যুরিস্ট ভিসা সহায়তা।",
      is_published: true,
      created_at: new Date()
    },
    {
      name_en: "Schengen Area",
      name_bn: "শেনজেন এরিয়া",
      slug: "schengen",
      hero_image_url: "https://images.unsplash.com/photo-1516483638261-f40889d1c521?w=1200&auto=format&fit=crop",
      overview_en: "Travel across 27 European countries with a single Schengen visa. Full application guidance provided.",
      overview_bn: "একটিমাত্র শেনজেন ভিসা দিয়ে ২৭টি ইউরোপীয় দেশে ভ্রমণ করুন। সম্পূর্ণ আবেদন সহায়তা প্রদান করা হয়।",
      is_published: true,
      created_at: new Date()
    }
  ];

  for (const c of moreCountries) {
    await db.collection('visa_countries').doc(c.slug).set(c);
    console.log('Added ' + c.name_en);
  }
  console.log("Done seeding.");
}

seed();

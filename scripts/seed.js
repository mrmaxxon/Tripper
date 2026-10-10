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
  console.log("Seeding Visa Countries...");
  
  const countries = [
    {
      name_en: "United Arab Emirates",
      name_bn: "সংযুক্ত আরব আমিরাত",
      slug: "uae",
      hero_image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
      overview_en: "Experience the luxury of Dubai and Abu Dhabi. We offer fast processing for UAE tourist and business visas.",
      overview_bn: "দুবাই এবং আবুধাবির বিলাসিতা উপভোগ করুন। আমরা ইউএই ট্যুরিস্ট এবং বিজনেস ভিসার জন্য দ্রুত প্রসেসিং অফার করি।",
      is_published: true,
      created_at: new Date()
    },
    {
      name_en: "India",
      name_bn: "ভারত",
      slug: "india",
      hero_image_url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
      overview_en: "From the Taj Mahal to the Himalayas. We process Indian tourist, medical, and business visas seamlessly.",
      overview_bn: "তাজমহল থেকে হিমালয় পর্যন্ত। আমরা ভারতীয় ট্যুরিস্ট, মেডিকেল এবং বিজনেস ভিসা নির্বিঘ্নে প্রসেস করি।",
      is_published: true,
      created_at: new Date()
    },
    {
      name_en: "United Kingdom",
      name_bn: "যুক্তরাজ্য",
      slug: "uk",
      hero_image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
      overview_en: "Visit London, Scotland, and beyond. Get expert guidance for your UK Standard Visitor Visa application.",
      overview_bn: "লন্ডন, স্কটল্যান্ড এবং আরও অনেক কিছু ভ্রমণ করুন। আপনার ইউকে স্ট্যান্ডার্ড ভিজিটর ভিসা আবেদনের জন্য বিশেষজ্ঞের নির্দেশনা পান।",
      is_published: true,
      created_at: new Date()
    },
    {
      name_en: "United States",
      name_bn: "যুক্তরাষ্ট্র",
      slug: "usa",
      hero_image_url: "https://images.unsplash.com/photo-1496442226666-8d4d0e2815cb?q=80&w=2070&auto=format&fit=crop",
      overview_en: "From New York to the Grand Canyon. We assist with B1/B2 tourist visas and interview preparation.",
      overview_bn: "নিউইয়র্ক থেকে গ্র্যান্ড ক্যানিয়ন পর্যন্ত। আমরা B1/B2 ট্যুরিস্ট ভিসা এবং ইন্টারভিউ প্রস্তুতিতে সহায়তা করি।",
      is_published: true,
      created_at: new Date()
    }
  ];

  for (const country of countries) {
    const docRef = db.collection('visa_countries').doc(country.slug);
    await docRef.set(country);
    console.log(`Added ${country.name_en}`);
  }
  
  console.log("Seed complete!");
}

seed().catch(console.error);

require('dotenv').config({ path: '.env.local' });
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});

const db = getFirestore();

const packagesData = [
  {
    slug: 'saint-martin-retreat',
    name_en: 'Saint Martin Island Retreat',
    name_bn: 'সেন্টমার্টিন আইল্যান্ড রিট্রিট',
    duration_en: '3 Days, 2 Nights',
    duration_bn: '৩ দিন, ২ রাত',
    price_bdt: 8500,
    hero_image_url: 'https://images.unsplash.com/photo-1598162238318-7dc5e140cfa9?w=1200&auto=format&fit=crop',
    overview_en: 'Escape to the only coral island in Bangladesh. Includes AC bus, ship tickets, and beachfront resort.',
    overview_bn: 'বাংলাদেশের একমাত্র প্রবাল দ্বীপে একটি চমৎকার ছুটি। এসি বাস, জাহাজের টিকিট এবং বিচফ্রন্ট রিসোর্ট অন্তর্ভুক্ত।',
    highlights: ['Blue water beach', 'Coral viewing', 'Seafood BBQ'],
    is_published: true
  },
  {
    slug: 'sundarbans-safari',
    name_en: 'Sundarbans Wildlife Safari',
    name_bn: 'সুন্দরবন ওয়াইল্ডলাইফ সাফারি',
    duration_en: '4 Days, 3 Nights',
    duration_bn: '৪ দিন, ৩ রাত',
    price_bdt: 12000,
    hero_image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop',
    overview_en: 'Cruise through the largest mangrove forest. Spot Royal Bengal Tigers, crocodiles, and deer.',
    overview_bn: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বনের ভেতর দিয়ে ক্রুজ। রয়েল বেঙ্গল টাইগার, কুমির এবং হরিণ দেখার সুযোগ।',
    highlights: ['Jungle trek', 'River cruise', 'Wildlife photography'],
    is_published: true
  },
  {
    slug: 'sajek-cloud-valley',
    name_en: 'Sajek Valley Cloud Expedition',
    name_bn: 'সাজেক ভ্যালি ক্লাউড এক্সপেডিশন',
    duration_en: '2 Days, 1 Night',
    duration_bn: '২ দিন, ১ রাত',
    price_bdt: 6000,
    hero_image_url: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=1200&auto=format&fit=crop',
    overview_en: 'Experience the clouds touching your balcony. A perfect weekend getaway in the hills.',
    overview_bn: 'পাহাড়ের চূড়ায় মেঘের স্পর্শ নেওয়ার অভিজ্ঞতা। নিখুঁত সাপ্তাহিক ছুটি।',
    highlights: ['Konglak Hill', 'Alutila Cave', 'Tribal food'],
    is_published: true
  }
];

async function seedPackages() {
  console.log('Starting packages seed...');
  const batch = db.batch();
  
  for (const pkg of packagesData) {
    const docRef = db.collection('packages').doc(pkg.slug);
    batch.set(docRef, {
      ...pkg,
      created_at: new Date(),
    });
  }

  await batch.commit();
  console.log('Successfully seeded 3 packages!');
}

seedPackages().catch(console.error);

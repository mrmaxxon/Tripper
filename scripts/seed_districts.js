const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

require('dotenv').config({ path: '.env.local' });

initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});

const db = getFirestore();

const districtsData = [
  {
    name: 'Cox\'s Bazar',
    bn_name: 'কক্সবাজার',
    division: 'Chattogram',
    image: 'https://images.unsplash.com/photo-1608958435020-e855b0baa0d4?q=80&w=800&auto=format&fit=crop',
    description: 'Home to the longest natural sea beach in the world.',
    bn_description: 'বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত।',
    popularSpots: ['Inani Beach', 'Himchari', 'Saint Martin\'s Island']
  },
  {
    name: 'Sylhet',
    bn_name: 'সিলেট',
    division: 'Sylhet',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop',
    description: 'The land of two leaves and a bud, famous for tea gardens.',
    bn_description: 'দুটি পাতা একটি কুঁড়ির দেশ, চা বাগানের জন্য বিখ্যাত।',
    popularSpots: ['Ratargul Swamp Forest', 'Jaflong', 'Bisanakandi']
  },
  {
    name: 'Bandarban',
    bn_name: 'বান্দরবান',
    division: 'Chattogram',
    image: 'https://images.unsplash.com/photo-1598162238318-7dc5e140cfa9?q=80&w=800&auto=format&fit=crop',
    description: 'Beautiful hilly district with waterfalls and indigenous culture.',
    bn_description: 'জলপ্রপাত এবং আদিবাসী সংস্কৃতি সহ সুন্দর পাহাড়ি জেলা।',
    popularSpots: ['Nilgiri', 'Nafakhum', 'Boga Lake']
  },
  {
    name: 'Dhaka',
    bn_name: 'ঢাকা',
    division: 'Dhaka',
    image: 'https://images.unsplash.com/photo-1608958435020-e855b0baa0d4?q=80&w=800&auto=format&fit=crop',
    description: 'The capital city, rich in history, culture, and architecture.',
    bn_description: 'ইতিহাস, সংস্কৃতি এবং স্থাপত্যে সমৃদ্ধ রাজধানী শহর।',
    popularSpots: ['Ahsan Manzil', 'Lalbagh Fort', 'Dhakeshwari Temple']
  },
  {
    name: 'Khulna',
    bn_name: 'খুলনা',
    division: 'Khulna',
    image: 'https://images.unsplash.com/photo-1629851147779-66c89139ecbb?q=80&w=800&auto=format&fit=crop',
    description: 'Gateway to the Sundarbans, the largest mangrove forest.',
    bn_description: 'সুন্দরবনের প্রবেশদ্বার, বিশ্বের বৃহত্তম ম্যানগ্রোভ বন।',
    popularSpots: ['Sundarbans', 'Sixty Dome Mosque (Bagerhat)']
  }
];

async function seedDistricts() {
  console.log('Starting districts seed...');
  const batch = db.batch();
  
  for (const district of districtsData) {
    const docRef = db.collection('districts').doc(district.name.toLowerCase().replace(/\s+/g, '_'));
    batch.set(docRef, {
      ...district,
      createdAt: new Date(),
    });
  }

  await batch.commit();
  console.log('Successfully seeded 5 popular districts!');
}

seedDistricts().catch(console.error);

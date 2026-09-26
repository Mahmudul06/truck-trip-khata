/**
 * Run once to seed Firestore with your owner + drivers + truck.
 *
 * Usage:
 *   1. Fill in your Firebase serviceAccountKey.json (download from Firebase Console → Project Settings → Service Accounts)
 *   2. npm install firebase-admin (one time, not saved to package.json)
 *   3. node scripts/seed-firebase.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // download from Firebase Console

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function seed() {
  // 1. Truck
  await db.collection('trucks').doc('truck1').set({
    plateNumber: 'AS01-1234',
    ownerId: 'owner1',
  });
  console.log('✓ Truck created');

  // 2. Owner (change name/phone to real values)
  await db.collection('users').doc('owner1').set({
    name: 'Ramesh Kumar',       // ← change this
    phone: '9876543210',        // ← change this
    role: 'owner',
    truckId: 'truck1',
  });
  console.log('✓ Owner created');

  // 3. Drivers (add as many as needed)
  await db.collection('users').doc('driver1').set({
    name: 'Rahim Ali',          // ← change this
    phone: '9876543211',        // ← change this
    role: 'driver',
    pin: '1234',                // ← change this (4-digit PIN you give the driver)
    truckId: 'truck1',
  });
  console.log('✓ Driver 1 created');

  await db.collection('users').doc('driver2').set({
    name: 'Suresh Das',         // ← change this
    phone: '9876543212',        // ← change this
    role: 'driver',
    pin: '5678',                // ← change this
    truckId: 'truck1',
  });
  console.log('✓ Driver 2 created');

  console.log('\n✅ Seed complete! Your app is ready.');
  process.exit(0);
}

seed().catch(console.error);

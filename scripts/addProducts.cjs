const admin = require('firebase-admin');

// 🔐 Load service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function addProducts() {
  try {
    const products = [
      {
        category: "poster",
        currency: "INR",
        description: "Minimal abstract mountain artwork",
        dimensions: "18x24 inch",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/inkvia-b31c1.firebasestorage.app/o/pushpa.jpg?alt=media&token=7b9d61e4-1386-4f96-8ada-b2408dc1eda9"
        ],
        isAvailable: true,
        price: 499,
        stock: 50,
        title: "Abstract Mountain Poster",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        category: "poster",
        currency: "INR",
        description: "Modern black and white geometric art",
        dimensions: "18x24 inch",
        imageUrls: [
          "https://firebasestorage.googleapis.com/v0/b/inkvia-b31c1.firebasestorage.app/o/pushpa.jpg?alt=media&token=7b9d61e4-1386-4f96-8ada-b2408dc1eda9"
        ],
        isAvailable: true,
        price: 699,
        stock: 30,
        title: "Geometric Art Poster",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      }
    ];

    for (const product of products) {
      const docRef = await db.collection('posters').add(product);
      console.log(`✅ Added product with ID: ${docRef.id}`);
    }

    console.log("🎉 All products added successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error adding products:", error);
    process.exit(1);
  }
}

addProducts();
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXmmC4ZMiS95vM0rP6uk20nhzOcJkI_HU",
  authDomain: "inkvia-b31c1.firebaseapp.com",
  projectId: "inkvia-b31c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  // Posters
  await addDoc(collection(db, "posters"), {
    title: "Abstract Mountain Poster",
    description: "Minimal abstract mountain artwork",
    price: 399,
    currency: "INR",
    imageUrls: ["https://via.placeholder.com/400"],
    category: "poster",
    dimensions: "18x24 inch",
    stock: 50,
    isAvailable: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });

  // Stickers
  await addDoc(collection(db, "stickers"), {
    title: "Laptop Hacker Sticker",
    description: "Waterproof vinyl sticker",
    price: 99,
    currency: "INR",
    imageUrls: ["https://via.placeholder.com/200"],
    category: "sticker",
    material: "Vinyl",
    size: "3x3 inch",
    stock: 200,
    isAvailable: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });

  // Clothing
  await addDoc(collection(db, "clothing"), {
    title: "Inkvia Black Hoodie",
    description: "Premium cotton hoodie",
    price: 1499,
    currency: "INR",
    imageUrls: ["https://via.placeholder.com/500"],
    category: "clothing",
    material: "Cotton",
    gender: "Unisex",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 5 }
    ],
    isAvailable: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });

  console.log("🔥 Firestore seeded successfully");
}

seedDatabase();

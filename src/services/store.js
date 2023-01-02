// This file contains all CRUD functions for the store.
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firestore";

// Get all items from the db and return an array so items can be set in state
export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const data = querySnapshot.docs.map((doc) => {
    // console.log(`${doc.id} => ${doc.data().image} ${doc.data().qty}`);
    const id = doc.id;
    const restOfData = doc.data();
    return { id, ...restOfData };
  });
  console.log(data);
  return data;
};

// Add items to the DB through the code instead of needed to manually add everything.

export const addItem = async (data) => {
  const { itemName, fav, featured, image, variants } = data;
  const item = { itemName, fav, featured, image, variants };
  const collectionRef = collection(db, "items");

  const newDoc = await addDoc(collectionRef, item);

  console.log(newDoc, "new item added");
  return newDoc;
};
// function to toggle the favourite boolean in the database.
export const toggleFav = async (id, toToggle) => {
  const docRef = doc(db, "items", id);
  await updateDoc(docRef, { fav: toToggle });
};
//
export const dbData = {
  // fav: false,
  // featured: true,
  // itemName: "Camembert",
  // image:
  //   "https://cdn11.bigcommerce.com/s-ek50668lzs/images/stencil/1280x1280/products/2974/3238/5686_557_detail__55934.1577655479.jpg?c=1?imbypass=on",
  // variants: [
  //   {
  //     image:
  //       "https://cdn11.bigcommerce.com/s-ek50668lzs/images/stencil/1280x1280/products/2974/3238/5686_557_detail__55934.1577655479.jpg?c=1?imbypass=on",
  //     price: 10,
  //     qty: 200,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://cdn11.bigcommerce.com/s-ek50668lzs/images/stencil/728x728/products/3041/3305/9321-lg__59185.1577655513.jpg?c=1",
  //     price: 20,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Camembert_de_Normandie_%28AOP%29_11.jpg/640px-Camembert_de_Normandie_%28AOP%29_11.jpg",
  //     price: 40,
  //     qty: 55,
  //     type: "wheel",
  //   },
  // ],
  // fav: false,
  // featured: true,
  // itemName: "Cheddar",
  // image:
  //   "https://www.goodfood.com.au/content/dam/images/4/9/u/d/r/image.related.articleLeadwide.620x349.gmep32.png/1454364000130.jpg",
  // variants: [
  //   {
  //     image:
  //       "https://cdn11.bigcommerce.com/s-ek50668lzs/images/stencil/1280x1280/products/2974/3238/5686_557_detail__55934.1577655479.jpg?c=1?imbypass=on",
  //     price: 8,
  //     qty: 200,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlx5o68xfyw-a52Z28uZzQNjWu1WQ350B28W_GqR2L29fiYq3u9SSuZXETcEUbtOftnZA&usqp=CAU",
  //     price: 16,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "https://t4.ftcdn.net/jpg/02/86/73/85/360_F_286738555_OBD9edCrNbYASkAfA8nY7XLPVPg6Tjih.jpg",
  //     price: 36,
  //     qty: 125,
  //     type: "wheel",
  //   },
  // ],
  // fav: false,
  // featured: true,
  // itemName: "Blue",
  // image:
  //   "https://previews.123rf.com/images/saddako/saddako1308/saddako130800058/21719409-wedge-of-blue-cheese-on-white-background.jpg",
  // variants: [
  //   {
  //     image:
  //       "https://previews.123rf.com/images/saddako/saddako1308/saddako130800058/21719409-wedge-of-blue-cheese-on-white-background.jpg",
  //     price: 12,
  //     qty: 200,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://cdn.shopify.com/s/files/1/0285/7828/3625/products/512TEc1tAmL.jpg?v=1602246116",
  //     price: 24,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "http://cdn.shopify.com/s/files/1/1834/0943/products/blue-DanWh_9d3eeb0f-934b-467b-8dc2-a89d19f4879f_800x.jpg?v=1627442446",
  //     price: 48,
  //     qty: 125,
  //     type: "wheel",
  //   },
  // ],
};

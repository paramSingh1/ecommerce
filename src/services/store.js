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

// remove items once user has checked out.
export const checkout = async (id, type, qty) => {
  const docRef = doc(db, "items", id);
  const querySnapshot = await getDocs(collection(db, "items"));

  console.log(docRef);
  const data = querySnapshot.docs.map((doc) => {
    // console.log(`${doc.id} => ${doc.data().image} ${doc.data().qty}`);
    const id = doc.id;
    const restOfData = doc.data();
    return { id, ...restOfData };
  });

  const found = data.filter((item) => item.id == id);
  console.log(found, "found");
  const x = found[0].variants.find((ele) => ele.type == type);
  x.qty = x.qty - qty;
  console.log(x, "x");
  console.log(found, "found 1");

  console.log(found[0].variants);

  // console.log(found[0].variants, "vars");

  console.log(data);
  await updateDoc(docRef, { variants: found[0].variants });
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
  // itemName: "Brie",
  // image:
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb7TzizwgP7NaSYE5wLMrkIQHYyW_yQ2D4K-8kOnu_gTdz9WK_z9vTHFE7G5YXUyhyFvY&usqp=CAU",
  // variants: [
  //   {
  //     image:
  //       "https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6IjhmMTFiODkyMGJhZDdmMWZlY2U4OTQ2MGVkODJkZGJjIiwic3RvcmFnZSI6InB1YmxpY19zdG9yZSJ9?signature=5d145466da26b69cf048858d131162aa25ecd15412afc417a22e27032bd6a33d",
  //     price: 10,
  //     qty: 200,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://yimages360.s3.amazonaws.com/products/2020/07/5f117ad460133/1x.jpg",
  //     price: 20,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image: "https://ocello.com.au/wp-content/uploads/2022/03/nangis-2-1.jpeg",
  //     price: 40,
  //     qty: 55,
  //     type: "wheel",
  //   },
  // ],
  // fav: false,
  // featured: true,
  // itemName: "Goat",
  // image:
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXIDtAnD-4aAJMDGOY4LaYHgnVQwr3OQOU22hiKXT_qW73cfxgX9aRipxM00O9I_dc4Aw&usqp=CAU",
  // variants: [
  //   {
  //     image:
  //       "https://previews.123rf.com/images/croreja/croreja1211/croreja121100011/16255648-goat-cheese-and-cut-into-wedge.jpg",
  //     price: 20,
  //     qty: 400,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNe307_wSivUfJ3GIwYDPkSrGM5QYkFsGCCg&usqp=CAU",
  //     price: 40,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "https://thumbs.dreamstime.com/z/goat-cheese-wheel-wooden-table-34658012.jpg",
  //     price: 70,
  //     qty: 55,
  //     type: "wheel",
  //   },
  // ],
};

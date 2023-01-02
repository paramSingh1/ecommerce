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
  const { itemName, description, fav, featured, image, variants } = data;
  const item = { itemName, description, fav, featured, image, variants };
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
  //
  // fav: false,
  // featured: true,
  // itemName: "Brie",
  // description:
  //   "Brie is a soft cheese with a creamy, buttery flavor and a white, bloomy rind. It is often served as a table cheese or used in cooking.",
  // image:
  //   "https://www.thespruceeats.com/thmb/80y_EsiTh1y5ZrUBS4DRuOyCPKE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/200478645-001-56a497b53df78cf77283260c.jpg",
  // variants: [
  //   {
  //     image: "https://www.neworleans-food.com/recipe_images/brie.jpeg",
  //     price: 20,
  //     qty: 400,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://www.healthbenefitstimes.com/9/gallery/brie-cheese/Half-cut-Brie-cheese.jpg",
  //     price: 40,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "https://www.thespruceeats.com/thmb/80y_EsiTh1y5ZrUBS4DRuOyCPKE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/200478645-001-56a497b53df78cf77283260c.jpg",
  //     price: 70,
  //     qty: 55,
  //     type: "wheel",
  //   },
  // ],
  // fav: false,
  // featured: true,
  // itemName: "Cheddar",
  // description:
  //   "Cheddar is a firm cheese with a sharp, tangy flavor and a pale yellow to orange color. It is a versatile cheese that can be used in a variety of dishes, from grilled cheese sandwiches to mac and cheese.",
  // image:
  //   "https://www.goodfood.com.au/content/dam/images/4/9/u/d/r/image.related.articleLeadwide.620x349.gmep32.png/1454364000130.jpg",
  // variants: [
  //   {
  //     image:
  //       "https://cdn-prod.dairyaustralia.com.au/-/media/dairy/images/products/cheese/cheddar-and-cheddar-styles/1-2-5-cheddar.jpg?h=410&w=720&rev=d635186faac24d1bb7d8cf2ba539dac5&hash=1B6316C989BF235AA60F92C66C2EE1E4",
  //     price: 8,
  //     qty: 200,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://cdn.shopify.com/s/files/1/2836/2982/products/pic10_grande.jpg?v=1529434190",
  //     price: 16,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "https://cdn.shopify.com/s/files/1/0037/6022/6419/products/NYD_CHEESES_STONEBECKWENSLEYDALE_176_800x.jpg?v=1603373090",
  //     price: 36,
  //     qty: 125,
  //     type: "wheel",
  //   },
  // ],
  // fav: false,
  // featured: true,
  // itemName: "Camembert",
  // description:
  //   "Camembert is a soft cheese with a creamy, buttery flavor and a white, bloomy rind, similar to brie. It is often served as a table cheese or used in cooking.",
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
  // fav: false,
  // featured: true,
  // itemName: "Goat",
  // description:
  //   "Goat cheese is made from the milk of goats and has a soft, crumbly texture and a tangy, slightly sweet flavor. It is often used as a topping for salads or baked into dishes.",
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
  //       "https://ecotimesdz.com/wp-content/uploads/2021/12/i147666-chevre.jpeg",
  //     price: 40,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "https://img.cuisineaz.com/680x357/2022/09/12/i187737-rappel-de-produit-ne-consommez-pas-ce-fromage-de-chevre.jpgg",
  //     price: 70,
  //     qty: 55,
  //     type: "wheel",
  //   },
  // fav: false,
  // featured: true,
  // itemName: "Blue",
  // description:
  //   "Blue cheese is a type of cheese that is made with cultures of mold, which gives it a strong, pungent flavor and a blue or green marbled appearance. It is often served as a dessert cheese or used in salads and dressings.",
  // image:
  //   "https://assets.afcdn.com/story/20190219/1333738_w3168h2376c1cx1584cy2376cxt0cyt918cxb3168cyb4276.jpg",
  // variants: [
  //   {
  //     image:
  //       "https://www.datocms-assets.com/66263/1660847658-fromage-dici-1920x1080.jpg",
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
  //       "http://cdn.shopify.com/s/files/1/1088/8990/articles/Bleu-d-auvergne._Fromageries_Occitanes_520x500_6d6a0f48-08ed-4659-899a-afcdbee1db8e.jpg?v=1617339082",
  //     price: 48,
  //     qty: 125,
  //     type: "wheel",
  //   },
  // ],
  // fav: false,
  // featured: true,
  // itemName: "Gouda",
  // description:
  //   "Gouda is a hard cheese with a smooth, creamy texture and a mild, slightly sweet flavor. It is a versatile cheese that can be used in a variety of dishes, from sandwiches to soups.",
  // image: "https://m.media-amazon.com/images/I/81CyK+H6jxL.jpg",
  // variants: [
  //   {
  //     image: "https://m.media-amazon.com/images/I/41t6qXeboqL._AC_SY580_.jpg",
  //     price: 15,
  //     qty: 200,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://cdn.shopify.com/s/files/1/0285/7828/3625/products/512TEc1tAmL.jpg?v=1602246116",
  //     price: 30,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHbRa-AlauSVFIEcXhHTf6VB9iFaSUudNnBA&usqp=CAU",
  //     qty: 125,
  //     type: "wheel",
  //   },
  // ],
  // fav: false,
  // featured: true,
  // itemName: "Jarlsberg",
  // description:
  //   "Swiss Jarlsberg is a semi-hard cheese with a nutty, sweet flavor and a pale yellow color. It is a versatile cheese that can be used in a variety of dishes, from sandwiches to fondue.",
  // image: "https://www.humphreysfarm.com/productcart/pc/catalog/5535-lg.jpg",
  // variants: [
  //   {
  //     image:
  //       "https://ultrafoods.ca/wp-content/uploads/2018/05/Jarlsberg-Cheese.jpg",
  //     price: 15,
  //     qty: 200,
  //     type: "wedge",
  //   },
  //   {
  //     image:
  //       "https://images.heb.com/is/image/HEBGrocery/000413636?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
  //     price: 30,
  //     qty: 200,
  //     type: "half",
  //   },
  //   {
  //     image: "https://www.humphreysfarm.com/productcart/pc/catalog/5535-lg.jpg",
  //     qty: 125,
  //     type: "wheel",
  //   },
  // ],
};

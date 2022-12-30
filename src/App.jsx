import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import { getItems } from "./services/store";
import Nav from "./components/Nav/Nav";
import HomePage from "./containers/HomePage/HomePage";
import Products from "./containers/Products/Products";
import ProductPage from "./containers/ProductPage/ProductPage";
import { addItem, dbData } from "./services/store";

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Wrapper function to set items to state through an ASYNC function which cannot be done directly in useEffect
    const wrapper = async () => {
      const items = await getItems();
      setItems(items);
      // addItem(dbData);
      items.forEach((ele) => {
        console.log(ele.variants, "vars");
      });
      // console.log(items);
    };
    wrapper();
  }, []);
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage items={items} />} />
          <Route path="/products" element={<Products items={items} />} />
          <Route
            path="/productpage/:id"
            element={<ProductPage items={items} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

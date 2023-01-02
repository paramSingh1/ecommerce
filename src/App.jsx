import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import { getItems } from "./services/store";
import Nav from "./components/Nav/Nav";
import HomePage from "./containers/HomePage/HomePage";
import Products from "./containers/Products/Products";
import ProductPage from "./containers/ProductPage/ProductPage";
import { addItem, dbData } from "./services/store";
import { toggleFav } from "./services/store";
import Favourites from "./containers/Favourites/Favourites";

function App() {
  const [items, setItems] = useState([]);
  const pullData = async () => {
    const items = await getItems();
    setItems(items);
  };
  useEffect(() => {
    // Wrapper function to set items to state through an ASYNC function which cannot be done directly in useEffect
    const wrapper = async () => {
      pullData();
      // addItem(dbData);
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
            element={<ProductPage items={items} toggleFav={toggleFav} />}
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                items={items}
                setItems={setItems}
                pullData={pullData}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

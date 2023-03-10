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
import Cart from "./containers/Cart/Cart";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const handleCart = (itemObject) => {
    setCart([...cart, itemObject]);
  };

  const pullData = async () => {
    const items = await getItems();
    setItems(items);
  };
  useEffect(() => {
    // Wrapper function to set items to state through an ASYNC function which cannot be done directly in useEffect
    const wrapper = async () => {
      await pullData();
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
          <Route
            path="/products"
            element={<Products items={items} pullData={pullData} />}
          />
          <Route
            path="/productpage/:id"
            element={
              <ProductPage
                items={items}
                toggleFav={toggleFav}
                handleAddToCart={handleCart}
                currentCart={cart}
                pullData={pullData}
                setItems={setItems}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                items={items}
                toggleFav={toggleFav}
                pullData={pullData}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                items={items}
                handleAddToCart={handleCart}
                currentCart={cart}
                setCart={setCart}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
const ProductPage = ({ items, handleAddToCart, toggleFav, currentCart }) => {
  const { id } = useParams();

  //   the initial product that has been extracted
  const [product, setProduct] = useState({});
  const [productVariant, setProductVariant] = useState({});
  const [variants, setVariant] = useState([]);
  const [variantType, setVariantType] = useState({});
  const [selectedQty, setSelectedQty] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    const productData = items.find((item) => item.id == id);
    // console.log(productData);
    setProduct(productData);
    setVariant(productData.variants);

    // by default, the first type will be selected
    setVariantType(productData.variants[0]);
    console.log(variants, "variants test");
  }, [id, items]);

  useEffect(() => {}, [productVariant]);
  useEffect(() => {}, [selectedQty]);

  const changeVariant = (event) => {
    event.preventDefault();
    // console.log(event.target.value, "yes");
    const selectedType = event.target.value;
    setVariantType(selectedType);

    const newType = variants.find((ele) => ele.type == selectedType);
    console.log(newType, "newtype");
    setProductVariant(newType);

    console.log(variantType, "state");
  };
  const handleDec = () => {
    selectedQty > 1 ? setSelectedQty(selectedQty - 1) : setSelectedQty(1);
  };
  const handleInc = () => {
    selectedQty <= productVariant.qty
      ? setSelectedQty(selectedQty + 1)
      : setSelectedQty(productVariant.qty);
  };
  const handleInputChange = (event) => {
    console.log(selectedQty);
    if (!event.target.value) {
      setSelectedQty(1);
    } else {
      event.target.value < productVariant.qty
        ? setSelectedQty(event.target.value)
        : setSelectedQty(productVariant.qty);
    }
  };

  const addToCart = () => {
    const cartItem = { product, selectedQty, productVariant };
    console.log(cartItem, "tocart");
    handleAddToCart(cartItem);
  };

  const handleFavToggle = async () => {
    let negatedBool = !product.fav;

    const updatedProduct = {
      ...product,
      fav: negatedBool,
    };
    setProduct(updatedProduct);

    console.log(negatedBool, "negatedBool");
    await toggleFav(product.id, negatedBool);
    //if the item is being removed from favourites, go back to favourites page
    if (!negatedBool) {
      navigate("/favourites");
    }
  };
  return product ? (
    <div className={styles.productPage_Container}>
      <h1>{product.itemName}</h1>
      <div>
        <img
          className={styles.productPage_Container_image}
          src={productVariant.image ? productVariant.image : product.image}
          alt="product photo"
        />
      </div>
      <div>
        <p>Select Option:</p>
        {variants.map((ele, index) => {
          {
            // console.log(ele.type);
          }
          return (
            <button key={index} value={ele.type} onClick={changeVariant}>
              {ele.type}
            </button>
          );
        })}
      </div>
      {productVariant.price && (
        <div>
          <p>
            We have {productVariant.qty} {productVariant.type}'s in stock!{" "}
          </p>
          <p>
            Price : $
            {selectedQty
              ? productVariant.price * selectedQty
              : productVariant.price}{" "}
          </p>
          <div className={styles.Quantity}>
            <button onClick={handleDec}>-</button>
            <input
              type="number"
              value={selectedQty}
              min="1"
              max={`${productVariant.qty}`}
              onChange={handleInputChange}
            />
            <button onClick={handleInc}>+</button>
          </div>
          <button onClick={addToCart}>Add to cart</button>
        </div>
      )}
      <button onClick={handleFavToggle}>
        {" "}
        {product.fav ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  ) : (
    <div>Product does not exist</div>
  );
};

export default ProductPage;

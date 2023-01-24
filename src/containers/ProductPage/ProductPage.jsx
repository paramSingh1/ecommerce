import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { getItems } from "../../services/store";
const ProductPage = ({
  items,
  setItems,
  handleAddToCart,
  toggleFav,
  currentCart,
  pullData,
}) => {
  const { id } = useParams();

  //   the initial product that has been extracted
  const [product, setProduct] = useState({});
  const [productVariant, setProductVariant] = useState({});
  const [variants, setVariant] = useState([]);
  const [variantType, setVariantType] = useState({});
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    const wrapper = async () => {
      const newitems = await getItems();
      setItems(newitems);
    };
    wrapper();
  }, []);

  // const navigate = useNavigate();
  useEffect(() => {
    const productData = items.find((item) => item.id == id);

    setProduct(productData);

    // by default, the first type will be selected
    setVariantType(productData.variants[0]);
    setVariant(productData.variants);
  }, [variants]);

  // useEffect(() => {}, [productVariant]);
  // useEffect(() => {}, [selectedQty]);

  const changeVariant = (event) => {
    event.preventDefault();

    const selectedType = event.target.value;
    setVariantType(selectedType);

    const newType = variants.find((ele) => ele.type == selectedType);

    setProductVariant(newType);
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

    handleAddToCart(cartItem);
  };

  const handleFavToggle = async () => {
    let negatedBool = !product.fav;

    const updatedProduct = {
      ...product,
      fav: negatedBool,
    };
    setProduct(updatedProduct);

    await toggleFav(product.id, negatedBool);
    //if the item is being removed from favourites, go back to favourites page
    // if (!negatedBool) {
    //   navigate("/favourites");
    // }
  };
  return product ? (
    <div className={styles.productPage_Container}>
      <div>
        <img
          className={styles.productPage_Container_image}
          src={productVariant.image ? productVariant.image : product.image}
          alt="product photo"
        />
      </div>
      <h1 className={styles.productPage_Container_Title}>{product.itemName}</h1>
      <p className={styles.productPage_Container_Description}>
        {product.description
          ? product.description
          : "We're working on a description!"}
      </p>
      <div>
        <p>Select Option:</p>
        {variants &&
          variants.map((ele, index) => {
            return (
              <button
                className={styles.productPage_Container_button}
                key={index}
                value={ele.type}
                onClick={changeVariant}
              >
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
            <button
              className={styles.productPage_Container_button}
              onClick={handleDec}
            >
              -
            </button>
            <input
              className={styles.productPage_Container_input}
              type="number"
              value={selectedQty}
              min="1"
              max={`${productVariant.qty}`}
              onChange={handleInputChange}
            />
            <button
              className={styles.productPage_Container_button}
              onClick={handleInc}
            >
              +
            </button>
          </div>
          <button
            className={styles.productPage_Container_button}
            onClick={addToCart}
          >
            Add to cart
          </button>
        </div>
      )}

      <button
        className={styles.productPage_Container_button}
        onClick={handleFavToggle}
      >
        {product.fav ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  ) : (
    <div>Product does not exist</div>
  );
};

export default ProductPage;

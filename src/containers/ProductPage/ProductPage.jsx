import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
const ProductPage = ({ items }) => {
  const { id } = useParams();
  //   console.log(items, "from prod page");

  //   the initial product that has been extracted
  const [product, setProduct] = useState({});
  const [productVariant, setProductVariant] = useState({});
  const [variants, setVariant] = useState([]);
  const [variantType, setVariantType] = useState({});

  useEffect(() => {
    const productData = items.find((item) => item.id == id);
    // console.log(productData);
    setProduct(productData);
    setVariant(productData.variants);

    // by default, the firtst type will be selected
    setVariantType(productData.variants[0]);
    console.log(variants, "variants test");
  }, [id, items]);

  useEffect(() => {}, [productVariant]);

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
          <p>Price : ${productVariant.price} </p>
          <p>
            We have {productVariant.qty} {productVariant.type}'s in stock!{" "}
          </p>
        </div>
      )}
    </div>
  ) : (
    <div>Product does not exist</div>
  );
};

export default ProductPage;

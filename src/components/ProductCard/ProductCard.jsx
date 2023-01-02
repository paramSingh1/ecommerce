import React from "react";
import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
const ProductCard = ({ item }) => {
  console.log(item, "pC");
  return (
    <div className={styles.ProductCard}>
      <Link to={`/productpage/${item.id}`}>
        <h3>{item.itemName}</h3>
        <img
          className={styles.ProductCard_image}
          src={item.image}
          alt={item.itemName}
        />
        <p>starting from ${item.variants[0].price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;

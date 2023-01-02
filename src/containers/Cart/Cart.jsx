import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cart.module.scss";
import { checkout } from "../../services/store";

const Cart = ({ currentCart, setCart }) => {
  console.log(currentCart, "what we have");
  const navigate = useNavigate();
  const handleCheckout = async () => {
    const itemsById = currentCart.map((item) => {
      return {
        itemID: item.product.id,
        qty: item.selectedQty,
        type: item.productVariant.type,
      };
    });

    console.log(itemsById, "second");

    itemsById.forEach((element) => {
      checkout(element.itemID, element.type, element.qty);
    });
    setCart([]);
    navigate("/");
    alert("Thanks for your purchase");
  };
  return (
    <div className={styles.Cart}>
      {currentCart.length ? (
        currentCart.map((ele, index) => {
          return (
            <div key={index} className={styles.Cart_item}>
              <img
                className={styles.Cart_item_image}
                src={ele.productVariant.image}
                alt=""
              />

              <div className={styles.Cart_item_info}>
                <h3>
                  Item : {ele.product.itemName} - {ele.productVariant.type}
                </h3>
                <p>Quantity - {ele.selectedQty}</p>
                <p>Price per item : {ele.productVariant.price}</p>
                <p>
                  Total Price - $ {ele.selectedQty * ele.productVariant.price}
                </p>
                <Link to={`/productpage/${ele.product.id}`}>
                  <p>Product Page</p>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h1>Your Cart is Empty</h1>
          <Link to="/products">
            <div>Click here to start shopping</div>
          </Link>
        </div>
      )}
      {currentCart.length ? (
        <button onClick={handleCheckout}>Checkout</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;

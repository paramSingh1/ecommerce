import React from "react";
import styles from "./CarouselCard.module.scss";
const CarouselCard = ({ info, index }) => {
  console.log(info, "info");
  return (
    <div key={index} className={styles.CarouselCard}>
      <img className={styles.CarouselCard_image} src={info.image} alt="" />
      <h2>{info.itemName}</h2>
    </div>
  );
};

export default CarouselCard;

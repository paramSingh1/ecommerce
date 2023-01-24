import React, { useEffect, useState } from "react";
import CarouselCard from "../CarouselCard/CarouselCard";
import styles from "./Carousel.module.scss";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarouselPage = ({ items }) => {
  useEffect(() => {
    setInfo(items);
  }, []);

  const carouselItems = items.filter((ele) => ele.featured);
  return (
    <div className={styles.carousel}>
      <Carousel fade>
        {carouselItems.map((ele, index) => {
          return (
            <Carousel.Item key={index} className={styles.Carousel_item}>
              <Link to={`/productpage/${ele.id}`}>
                <img
                  className={styles.Carousel_image}
                  src={ele.image}
                  alt="product image"
                />
              </Link>

              <Carousel.Caption className={styles.Carousel_caption}>
                <p>{ele.itemName}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselPage;

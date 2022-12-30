import React, { useEffect, useState } from "react";
import { Carousel as Caro } from "react-responsive-carousel";
import CarouselCard from "../CarouselCard/CarouselCard";
import styles from "./Carousel.module.scss";

const Carousel = ({ items }) => {
  const [caroInfo, setInfo] = useState([]);

  useEffect(() => {
    setInfo(items);
  }, []);

  const carouselItems = items.filter((ele) => ele.featured);
  console.log(carouselItems, "caroitems");
  return (
    <Caro
      className={styles.Carousel}
      showArrows={true}
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
    >
      {carouselItems.map((ele, index) => {
        return <CarouselCard info={ele} index={index} />;
      })}
    </Caro>
  );
};

export default Carousel;

import React from "react";
import Carousel from "../../components/Carousel/Carousel";

const HomePage = ({ items }) => {
  return (
    <div>
      HomePage
      <Carousel items={items} />
    </div>
  );
};

export default HomePage;

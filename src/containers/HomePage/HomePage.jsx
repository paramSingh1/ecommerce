import React from "react";
import CarouselPage from "../../components/Carousel/CarouselPage";
import styles from "./HomePage.module.scss";
const HomePage = ({ items }) => {
  return (
    <div className={styles.HomePage}>
      <div className={styles.Landing}>
        <h1>La Maison du Fromage</h1>
        <h3>Sydney based artisian cheesery</h3>
        <p>Welcome to La Maison du Fromage (House of Cheese).</p>
        <p>
          We pride ourselves on the highest quality cheeses delivered fresh to
          your doorstep.
        </p>
      </div>

      <CarouselPage items={items} />
    </div>
  );
};

export default HomePage;

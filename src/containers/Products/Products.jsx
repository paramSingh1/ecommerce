import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.scss";
import { useEffect } from "react";

const Products = ({ items, pullData }) => {
  useEffect(() => {
    pullData();
  }, []);
  return (
    <div className={styles.Products}>
      {items &&
        items.map((item, index) => {
          console.log(item, "from item");
          return <ProductCard item={item} key={index} />;
        })}
    </div>
  );
};

export default Products;

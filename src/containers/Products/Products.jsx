import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.scss";

const Products = ({ items }) => {
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

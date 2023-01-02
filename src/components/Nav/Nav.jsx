import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";
const Nav = () => {
  return (
    <nav className={styles.Nav}>
      <div>
        <NavLink className={styles.Nav_item} to="/">
          <span className={styles.Nav_item_title}>La Maison du Fromage</span>
        </NavLink>
      </div>
      <div>
        <NavLink className={styles.Nav_item} to="/products">
          Products
        </NavLink>
        <NavLink className={styles.Nav_item} to="/favourites">
          Favourites
        </NavLink>
      </div>
      <div>
        <NavLink className={styles.Nav_item} to="/cart">
          Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;

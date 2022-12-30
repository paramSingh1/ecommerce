import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </div>
  );
};

export default Nav;

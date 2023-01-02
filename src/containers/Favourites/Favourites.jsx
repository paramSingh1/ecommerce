import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
const Favourites = ({ items, pullData }) => {
  const [list, setList] = useState([]);

  //   this useEffect pulls the most up to date data from the DB
  // so that the items state is in line with the DB
  useEffect(() => {
    const wrapper = async () => {
      pullData();
    };
    wrapper();

    console.log(list, "list");
    console.log(items, "fav items");
  }, []);
  //   This useEffect looks for changes in the items state, after being pulled,
  // filters the data and sets into list so it can be displayed.
  useEffect(() => {
    const faveItems = items.filter((ele) => ele.fav == true);
    setList(faveItems);
  }, [items]);
  return (
    <div>
      {list.length ? (
        list.map((item, index) => {
          return <ProductCard item={item} key={index} />;
        })
      ) : (
        <div>
          <h1>Nothing in Favourites list!</h1>
          <Link to="/products">
            <div>Click here to continue shopping</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourites;

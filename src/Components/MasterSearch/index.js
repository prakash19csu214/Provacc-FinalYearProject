import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import {images} from "../../Assets/Images";
import Spinner from "../Spinner"; // import a loading spinner component

const MasterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // add loading state
  const [sortOrder, setSortOrder] = useState("asc"); // initial sorting order is ascending

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/search?query=${searchTerm}`)
      .then((response) => {
        let sortedProducts = response.data;
        if (sortOrder === "asc") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
          sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const getSourceImage = (source) => {
    if (source === "Flipkart") {
      return images.flipkart;
    } else if (source === "Amazon") {
      return images.amazon;
    } else if (source === "Paytm Mall") {
      return images.paytmmall;
    }
  };
  

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1 className="text-center my-5">Product Search</h1>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <div className="d-flex justify-content-center mb-5">
          <div className="search-container my-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <button
          className="btn btn-outline-success my-3 "
          style={{ height: "45px" }}
          type="submit"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div className="product-container">
        {loading ? (
          <Spinner /> // show a spinner if loading is true
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card mb-5">
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                <img src={product.image} alt={product.name} />
                <h2 className="my-5 mx-2">{product.name}</h2>
                <p className="my-5 mx-2">Rs.{product.price}</p>
                <img src={getSourceImage(product.source)} alt={product.source} />
              </a>
            </div>          
          ))
        )}
      </div>
    </div>
  );
};

export default MasterSearch;

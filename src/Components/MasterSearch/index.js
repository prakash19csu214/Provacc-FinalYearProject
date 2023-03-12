import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import Spinner from "../Spinner"; // import a loading spinner component

const MasterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // add loading state

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setLoading(true); // set loading state to true before making the API call
    axios
      .get(`http://localhost:5000/search?query=${searchTerm}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // set loading state to false after the API call is finished
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // set loading state to false on error as well
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1 className="text-center my-5">Product Search</h1>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <div className="search-container my-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
              <p className="my-5 mx-2">{product.source}</p>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MasterSearch;

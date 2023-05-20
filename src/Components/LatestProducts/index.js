import React from "react";
import "./index.css";

const LatestProducts = ({ product }) => {
  const handleClick = () => {
    window.open(product.link, "_blank"); // Open product link in a new tab
  };

  return (
    <div className="col-4 col-sm-3 mx-3 my-2">
      <div className="row d-flex justify-content-center featured">
        <img src={product.image} alt={product.name} className="img-fluid featured-img" />
      </div>
      <div className="text-center featured-para">
        <b>{product.name}</b>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <br/>
        <br/>
          <b>Rs. {product.price} &nbsp;&nbsp;</b>
        <span className="latest-mini"> {product.price + 0.25 *product.price}</span>
      </div>
      <div className="row d-flex justify-content-center my-3">
        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={handleClick}>
          <span className="btnn2-text">Shop Now</span>
        </button>
      </div>
    </div>
  );
};

export default LatestProducts;

import React, { useEffect, useState } from "react";
import "./index.css";
import { Jumbotron } from "reactstrap";
import { images } from "../../Assets/Images";
import Heading from "../../Components/Heading";
import { ShopexCard } from "../../Components/ShopexCard";
import FeaturedProducts from "../../Components/FeaturedProductsCard";
import LatestProducts from "../../Components/LatestProducts";
import TrendingProducts from "../../Components/TrendingProductsCard";
import TopCategory from "../../Components/TopCategoryCard";
import { Button } from "../../Components/Button";
import BlogsCard from "../../Components/BlogsCard";
import axios from "axios";
import Spinner from "../../Components/Spinner"; // Import the Spinner component

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("http://localhost:5000/search?query=products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Set loading to false when the products are fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  const handleClick = () => {
    window.open('/masterSearch'); // Open product link in a new tab
  };

    return (
      <>
        <Jumbotron>
          <div className="row container">
            <div className="col-sm-2">
              <img src={images.JumboPic2} className="img-fluid h-jp2" />
            </div>

            <div className="col-12 col-sm-7">
              <div className="row row-header">
                <div className="col-12 col-sm-8 heading">
                  <p style={{ color: "var(--primary-color)" }}>
                    Best Furniture For Your Castle....
                  </p>
                  <b>New Furniture Collection Trends in 2023</b>
                  <p>
                    Upgrade your living space with our stunning selection of furniture that combines style, comfort, and durability.
                  </p>
                  <button className="btnn" onClick={handleClick}>
                    <div className="align-item-center btnn-text">Shop Now</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-3 container">
              <img
                src={images.JumboPic1}
                className="img-fluid"
                style={{ height: "450px" }}
              />
            </div>
          </div>
        </Jumbotron>

        <div className="sec-3 my-4 container">
        <div className="row justify-content-center d-flex">
          <Heading props="Featured Products" />
          <div className="row container d-flex justify-content-center my-5">
            {loading ? (
              <Spinner /> // Show the loading spinner if the products are still loading
            ) : (
              // Render the FeaturedProducts component with the fetched products
              products &&
              products.slice(2, 10).map((product) => (
                <FeaturedProducts product={product} key={product.id} />
              ))
            )}
          </div>
        </div>
      </div>
        <div className="sec-3 my-4 container">
          <div className="row justify-content-center d-flex">
            <Heading props="Latest Products" />
            <div className="row container d-flex justify-content-center my-5">
            {loading ? (
              <Spinner /> // Show the loading spinner if the products are still loading
            ) : (
              // Render the FeaturedProducts component with the fetched products
              products &&
              products.slice(10, 20).map((product) => (
                <LatestProducts product={product} key={product.id} />
              ))
            )}            </div>
          </div>
        </div>
        <div className="sec-3 my-4 container">
          <div className="row ">
            <div className="col-12 justify-content-center d-flex">
              <Heading props="Discount Item" />
            </div>
            <div className="col-7 col-sm-7 my-5">
              <Heading props="20% Discount Of All Products" />
              <br />
              <span className="chair-para">James Sofa Compact</span>
              <br />
              <br />
              <span className="chair-para2">
              Sofas feature cushions or seat pads for seating comfort. These cushions can be removable or fixed, and they may be filled with foam, feathers, or a combination of materials
              </span>
              <br />
              <br />
              <span className="chair-para2">
                <span className="fa fa-check"></span> Good Style and Design &nbsp;&nbsp;
                <span className="fa fa-check"></span> Best Quality <br />
                <span className="fa fa-check"></span> Long Term Product &nbsp;&nbsp;
                <span className="fa fa-check"></span> Value for Money
              </span>{" "}
              <br />
              <br />
            </div>
            <div className="col-6 col-sm-4">
              <img
                src={images.o}
                className="img-fluname"
                style={{ height: "500px", weight: "515px" }}
              />
            </div>
          </div>
        </div>
        <div className="bg-section my-4">
          <div className="row justify-content-center d-flex">
            <div className="my-5 mx-5">
            <Heading props="Get Leatest Update By Subscribe
Our Newslater" />
</div>
            <div className="row container d-flex justify-content-center my-4">
            <div className="row d-flex justify-content-center my-3">
        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={handleClick}>
          <span className="btnn2-text">Shop Now</span>
        </button>
      </div>

            </div>
            
          </div>
        </div>
      </>
    );
}

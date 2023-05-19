import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Jumbotron } from "reactstrap";
import GridCard from "../../Components/GridCard";
import Heading from "../../Components/Heading";
import ListCard from "../../Components/ListCard";
import Spinner from "../../Components/Spinner";
import axios from "axios";
import "./index.css";

function FashionPage() {
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); // Add sortOrder state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/search?query=Fashion cloth");
      let sortedProducts = response.data;

      if (sortOrder === "asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      setProducts(sortedProducts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleSortOrderChange = (event) => {
    setLoading(true);
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <Jumbotron style={{ backgroundColor: "#F6F5FF" }}>
        <Container>
          <Row>
            <Col>
              <Heading props="Big Sale on Fashion Items" />
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <Container>
        <Row>
          <Col className="col-12 col-md-6 col-xl-6">
            <h3 className="grid-head">Fashion & Clothes</h3>
          </Col>

          <Col className="col-12 col-md-6 col-xl-6">
            <Row>

              <Col className="col-8">
                <Row>
                  <Col className="col-12 col-lg-2">
                    <h5 className="grid-head">View-:</h5>
                  </Col>
                  <Col className="col-12 col-lg-10">
                    <Button
                      onClick={() => handleViewChange("grid")}
                      className="btn-grid"
                    >
                      Grid View &nbsp;&nbsp;
                      <i className="fa fa-lg fa-table"></i>
                    </Button>
                    <Button
                      onClick={() => handleViewChange("list")}
                      className="btn-grid"
                    >
                      List View &nbsp;&nbsp;
                      <i className="fa fa-lg fa-list"></i>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {view === "grid" && (
        <ShopGridDefault products={products} loading={loading} />
      )}
      {view === "list" && (
        <ShopList products={products} loading={loading} />
      )}
    </>
  );
}

function ShopGridDefault({ products, loading }) {
  return (
    <div className="row justify-content-center d-flex">
      <div className="row container d-flex justify-content-center my-5">
        {loading ? (
          <Spinner />
        ) : (
          products
            .map((product) => (
              <GridCard product={product} key={product.id} />
            ))
        )}
      </div>
    </div>
  );
}

function ShopList({ products, loading }) {
  return (
    <div className="row justify-content-center d-flex">
      <div className="row container d-flex justify-content-center my-5">
        {loading ? (
          <Spinner />
        ) : (
          products
            .map((product) => (
              <ListCard product={product} key={product.id} />
            ))
        )}
      </div>
    </div>
  );
}

export default FashionPage;

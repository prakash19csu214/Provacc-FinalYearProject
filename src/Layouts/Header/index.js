import React, { Component } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./index.css";
import { Navbar, NavbarBrand, Nav, Collapse, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      products: [],
      query: "",
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async searchProducts() {
    try {
      const response = await axios.get(
        `http://localhost:5000/search?query=${this.state.query}`
      );
      this.setState({ products: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchProducts();
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  

  render() {
    const { query } = this.state;
    console.log(this.state.products);


    return (
      <>
        <div className="header-top text-white">
          <div className="container">
            <div className="row">
              <div className="col-6 top-address">
                <div className="row">
                  <div className="col-6">
                    <span className="fa fa-light fa-envelope fa-sm"></span>{" "}
                    NCU, Gurgaon, HR 122001
                  </div>
                  <div className="col-6">
                    <span className="fa fa-phone fa-sm"></span> +94 000 00000
                  </div>
                </div>
              </div>
              <div className="offset-1 col-5 ">
                <div className="row">
                  <div className="col-3 col-lg-2 offset-lg-1 col-xl-3 offset-xl-0 ht-l">
                    English <span className="fa fa-solid fa-angle-down"></span>
                  </div>
                  <div className="col-3 col-lg-2 offset-lg-1 col-xl-3 offset-xl-0 ht-l">
                    USD <span className="fa fa-solid fa-angle-down"></span>
                  </div>
                  <div className="col-3 col-lg-2 offset-lg-1 col-xl-3 offset-xl-0 ht-l">
                    Login <span className="fa fa-sharp fa-sign-in"></span>
                  </div>
                  <div className="col-3 col-lg-2 offset-lg-1 col-xl-3 offset-xl-0 ht-l">
                    Whishlist <span className="fa fa-regular fa-heart "></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar expand="lg header-top bg-white">
          <div className="container">
            <button
              onClick={this.toggleNav}
              className="mr-2 toggle-button navbar-toggler"
            >
              <span className="fa fa-solid fa-bars"></span>
            </button>
            <NavbarBrand className="mr-auto navbar-logo" href="/home">
              <b>Provacc</b>
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar className="offset-2">
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg mt-2"> Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/shopGrid">
                    <span className="fa fa-camera fa-lg mt-2"> Electronics</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/fashionItems">
                    <span className="fa fa-diamond fa-lg mt-2"> Fashion</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/household">
                    <span className="fa fa-spoon fa-lg mt-2"> Household & Kitchen</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/masterSearch">
                    <span className="fa fa-search fa-lg mt-2"> Master Search</span>
                  </NavLink>
                </NavItem>
              </Nav>
             
            </Collapse>
          </div>
        </Navbar>
      </>
    );
  }
}

export default Header;
